import { authOptions } from '@server/auth';
import { getModeById } from '@server/controllers/mode-controller';
import { getTransactionWithStartedMode, updateTransaction } from '@server/controllers/transaction-controller';
import getQuestionsByJobDesc from '@server/services/question.service';
import { SettingsQuestionsRequest } from '@types';
import {
  FREE_MODE_SLUG,
  INITIAL_NUMBER_QUESTIONS_WITH_ANSWERS,
  TRANSACTION_MODE_STATUSES,
} from '@utils/constants/constants';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const settings: SettingsQuestionsRequest = {
  topic: '',
  topicName: '',
  level: null,
  firstPartAnswers: INITIAL_NUMBER_QUESTIONS_WITH_ANSWERS,
};

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.user_id;

  const body = await request.json();
  const jobTitle = body.jobTitle as string | undefined;
  const jobDesc = body.jobDesc as string | undefined;
  const mode_id = body.mode_id as string | undefined;

  if (!user_id || !jobTitle || !jobDesc || !mode_id) {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  const mode = await getModeById(mode_id);

  if (!mode) {
    return NextResponse.json({ error: 'Invalid mode_id' }, { status: 400 });
  }

  try {
    const isFreeMode = mode?.slug === FREE_MODE_SLUG;

    const newTransactionStatus = {
      filter: {
        user_id,
        mode: mode_id,
        mode_status: TRANSACTION_MODE_STATUSES.STARTED,
      },
      update: {
        mode_status: TRANSACTION_MODE_STATUSES.IN_PROGRESS,
      },
    };

    // TODO: remove it because there is transaction for Free mode also
    if (isFreeMode) {
      const questions = await getQuestionsByJobDesc({
        jobTitle,
        jobDesc,
        numberQuestions: mode.number_questions,
        // numberQuestions: 6,
        firstPartAnswers: settings.firstPartAnswers,
      });
      // const questions = mocQuestionList;
      await updateTransaction(newTransactionStatus);

      return NextResponse.json({
        lastIndexWithAnswer: settings.firstPartAnswers - 1,
        questions,
      });
    }

    // other modes
    const transaction = await getTransactionWithStartedMode(user_id);
    const startedModeID = transaction?.mode._id;

    if (startedModeID?.toString() === mode_id) {
      const questions = await getQuestionsByJobDesc({
        jobTitle,
        jobDesc,
        numberQuestions: mode.number_questions,
        firstPartAnswers: settings.firstPartAnswers,
      });
      // TODO: when openai api doesn't work
      // const questions = mocQuestionList;
      await updateTransaction(newTransactionStatus);

      return NextResponse.json({
        lastIndexWithAnswer: settings.firstPartAnswers - 1,
        questions,
      });
    }

    return NextResponse.json({ error: 'Invalid mode_id' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
