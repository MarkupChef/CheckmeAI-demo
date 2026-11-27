import { questionsPrompt } from '@promts';
import { authOptions } from '@server/auth';
import { getOptions } from '@server/controllers/anwers-controller';
import { getModeById } from '@server/controllers/mode-controller';
import { getTopic } from '@server/controllers/topic-controller';
import { getTransactionWithStartedMode, updateTransaction } from '@server/controllers/transaction-controller';
import { Question } from '@store/api/models/Questions.type';
import { SettingsQuestionsRequest, TopicLevels } from '@types';
import {
  FREE_MODE_SLUG,
  INITIAL_NUMBER_QUESTIONS_WITH_ANSWERS,
  TRANSACTION_MODE_STATUSES,
} from '@utils/constants/constants';
import { OPENAI_MODEL } from '@utils/constants/environments';
import { getUniqueQuestions } from '@utils/getUniqueQuestions';
import encryptNumber from '@utils/helpers/encryptNumber';
import getSecretKeyByDate from '@utils/helpers/getSecretKeyByDate';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import configOpenAI from '../../../../openai.config';

const settings: SettingsQuestionsRequest = {
  topic: '',
  topicName: '',
  level: null,
  firstPartAnswers: INITIAL_NUMBER_QUESTIONS_WITH_ANSWERS,
};

async function generateQuestions(
  questionCount: number,
  level: string,
  topicName: string,
  excludeQuestions: string[] = []
): Promise<string[] | never | null> {
  const MathResponse = z.object({
    questions: z.array(z.string()),
  });

  const { role, message: questionsMessage } = questionsPrompt.get(questionCount, level, topicName);
  const excludeMessage = excludeQuestions.length
    ? ` Do not repeat these questions: ${JSON.stringify(excludeQuestions)}.`
    : '';
  const message = `${questionsMessage}${excludeMessage}`;
  const openai = new OpenAI(configOpenAI);

  try {
    const completion = await openai.chat.completions.parse({
      model: OPENAI_MODEL,
      reasoning_effort: 'none',
      temperature: 0.7,
      max_completion_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: [
        { role: 'system', content: role },
        { role: 'user', content: message },
      ],
      response_format: zodResponseFormat(MathResponse, 'math_response'),
    });

    const math_response = completion.choices[0].message;

    if (math_response?.refusal) {
      throw new Error(`Error refusal: ${math_response.refusal}`);
    }

    const dataArray = math_response?.parsed?.questions;

    if (dataArray) {
      return dataArray;
    }

    return null;
  } catch (e: any) {
    const errorMessage = e.constructor.name === 'LengthFinishReasonError' ? `Too many tokens: ${e.message}` : e.message;

    throw new Error(`Error getting questions: ${errorMessage}`);
  }
}

async function getQuestions(numberQuestions: number, firstPartAnswers: number): Promise<Question[] | never> {
  if (!settings.topic || !settings.level) {
    throw new Error(`There is no a topic or level payload`);
  }

  const firstQuestionList = await generateQuestions(numberQuestions, settings.level, settings.topicName);

  if (!firstQuestionList?.length) {
    throw new Error(`List of questions is empty`);
  }

  const uniqueQuestions = getUniqueQuestions(firstQuestionList);

  if (uniqueQuestions.length < numberQuestions) {
    const additionalQuestionList = await generateQuestions(
      numberQuestions - uniqueQuestions.length,
      settings.level,
      settings.topicName,
      uniqueQuestions
    );

    uniqueQuestions.push(...getUniqueQuestions(additionalQuestionList || [], uniqueQuestions));
  }

  const generatedQuestions = uniqueQuestions.slice(0, numberQuestions);

  return await Promise.all(
    generatedQuestions.map(async (question, i) => {
      if (i < firstPartAnswers) {
        const { answerIndex, shuffledOptions } = await getOptions(settings.topicName, question);

        const date = Date.now().toString();
        const secretKey = getSecretKeyByDate(date);

        if (shuffledOptions.length) {
          return {
            id: i,
            expression: question,
            date,
            answerIndex: encryptNumber(answerIndex, secretKey),
            answerUserIndex: -1,
            options: shuffledOptions,
            answerTime: 0,
            explanation: null,
            practicalApplication: null,
          };
        }
      }

      return {
        id: i,
        date: '',
        expression: question,
        answerIndex: null,
        answerUserIndex: -1,
        options: [],
        answerTime: 0,
        explanation: null,
        practicalApplication: null,
      };
    })
  );
}

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.user_id;
  const searchParams = request.nextUrl.searchParams;
  const topicSlug = searchParams.get('topic');
  const level = searchParams.get('level');
  const mode_id = searchParams.get('mode_id');

  if (!user_id || !topicSlug || !level || !mode_id) {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  const topic = await getTopic(topicSlug);

  if (!topic) {
    return NextResponse.json({ error: 'Invalid topic' }, { status: 400 });
  }

  const mode = await getModeById(mode_id);

  if (!mode) {
    return NextResponse.json({ error: 'Invalid mode_id' }, { status: 400 });
  }

  try {
    settings.topic = topic.slug;
    settings.topicName = topic.name;
    settings.level = level as TopicLevels;

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

    const isFreeMode = mode?.slug === FREE_MODE_SLUG;

    // TODO: remove it because there is transaction for Free mode also
    if (isFreeMode) {
      const mode = await getModeById(mode_id);
      const questions = await getQuestions(mode?.number_questions as number, settings.firstPartAnswers);

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
      const mode = await getModeById(mode_id);
      const questions = await getQuestions(mode?.number_questions as number, settings.firstPartAnswers);
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
