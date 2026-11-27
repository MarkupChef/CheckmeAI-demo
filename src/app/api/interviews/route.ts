import { authOptions } from '@server/auth';
import { saveInterview } from '@server/controllers/interview-controller';
import { getModeById } from '@server/controllers/mode-controller';
import { Question } from '@store/api/models/Questions.type';
import { TEST_PASS_PERCENTAGE } from '@utils/constants/constants';
import { getPercentCorrectAnswersWithDecrypt } from '@utils/getPercentCorrectAnswersWithDecrypt';
import decryptNumber from '@utils/helpers/decryptNumber';
import generateHash from '@utils/helpers/generateHash';
import getSecretKeyByDate from '@utils/helpers/getSecretKeyByDate';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.user_id;

  try {
    const body = await request.json();
    const questions = body?.questions as Question[];
    const topic_slug = body?.topic_slug;
    const level = body?.level;
    const modeID = body?.mode as string;

    if (!topic_slug || !level || !questions || !modeID || !user_id) {
      return NextResponse.json({ message: 'Missing questions parameter from request body' }, { status: 400 });
    }

    // decrypt all answerIndex
    const questionsWithDecryptedAnswerIndex = questions.map((question: Question) => {
      const secret = getSecretKeyByDate(question.date);
      const answerIndex = decryptNumber(question.answerIndex as string, secret);

      return {
        ...question,
        answerIndex,
      };
    });

    const isPassed = getPercentCorrectAnswersWithDecrypt(questions) >= TEST_PASS_PERCENTAGE;

    const mode = await getModeById(modeID);
    const publicHash = (isPassed && mode?.is_certificate && generateHash(user_id)) || null;

    const result = await saveInterview({
      topic_slug,
      level,
      questions: questionsWithDecryptedAnswerIndex,
      user_id,
      passed: isPassed,
      mode: modeID,
      public_hash: publicHash,
    });

    return NextResponse.json(result.id);
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
