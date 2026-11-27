import { t } from '@i18n/server';
import { aiCheckJobRequirements } from '@server/ai_methods/aiCheckJobRequirements';
import { authOptions } from '@server/auth';
import { checkLockStatus, getFailedAttempts, recordFailure, resetAttempts } from '@server/cache/rateLimiterCache';
import { checkAvailableMode } from '@server/services/mode.service';
import {
  MAX_FAILED_ATTEMPTS,
  MAX_JOB_COMPANY_NAME_CHAR,
  MAX_JOB_REQUIREMENTS_CHAR,
  MAX_JOB_TITLE_CHAR,
} from '@utils/constants/constants';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const JobFormSchema = z.object({
  jobTitle: z
    .string()
    .trim()
    .min(5, { message: 'Job Title must be at least 5 characters long.' })
    .max(MAX_JOB_TITLE_CHAR, { message: `Job Title must be at most ${MAX_JOB_TITLE_CHAR} characters long.` })
    .refine((val) => !/<script/i.test(val), 'HTML tags are not allowed.'),

  companyName: z
    .string({ message: 'Company Name must be at least 5 characters long.' })
    .trim()
    .min(3, { message: 'Company Name must be at least 3 characters long.' })
    .max(MAX_JOB_COMPANY_NAME_CHAR, {
      message: `Company Name must be at most ${MAX_JOB_COMPANY_NAME_CHAR} characters long.`,
    })
    .refine((val) => !/<script/i.test(val), 'HTML tags are not allowed.'),

  jobDesc: z
    .string()
    .trim()
    .min(10, { message: 'Job Requirements must be at least 10 characters long.' })
    .max(MAX_JOB_REQUIREMENTS_CHAR, {
      message: `Job Requirements must be at most ${MAX_JOB_REQUIREMENTS_CHAR} characters long.`,
    })
    .refine((val) => !/<script/i.test(val), 'HTML tags are not allowed.'),

  modeId: z.string({ message: 'Invalid request payload: modeId' }),
});

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.user_id;

  if (!userId) {
    return NextResponse.json({ message: 'User Not Authenticated' }, { status: 401 });
  }

  try {
    const validatedData = JobFormSchema.parse(await request.json());
    const { jobTitle, jobDesc, modeId } = validatedData;

    // 1. Checking paid mode
    const availableMode = await checkAvailableMode({ modeId, userId });

    if (!availableMode.isAvailable) {
      return NextResponse.json({ message: `${t(availableMode.slug)} mode is not available` }, { status: 400 });
    }

    // 2. Check if there is attempts for Job Requirements checking
    const { isLocked, unlockTime } = checkLockStatus(userId);

    if (isLocked) {
      const unlockDate = new Date(unlockTime!).toISOString();

      return NextResponse.json(
        {
          message: `Too many attempts. Repeat after ${unlockDate}`,
        },
        { status: 429 }
      );
    }

    // 3. Check if Job Desc is valid by AI
    const isJobDescValid = await aiCheckJobRequirements({
      jobTitle,
      jobDesc,
    });

    if (isJobDescValid) {
      resetAttempts(userId);

      return NextResponse.json({ success: true });
    }

    // 4. Job Desc is not valid, change number of attempts
    recordFailure(userId);

    const attempts = MAX_FAILED_ATTEMPTS - getFailedAttempts(userId);

    return NextResponse.json(
      { message: `Job Requirements is invalid. Attempts remaining: ${attempts}` },
      { status: 400 }
    );
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const validationErrors = err.errors.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(err.message, { status: 500 });
  }
}
