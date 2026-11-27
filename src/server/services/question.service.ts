import aiGenerateAnswerOptions from '@server/ai_methods/aiAnswerOptionsGeneration';
import { aiGenerateQuestionsByJobDesc } from '@server/ai_methods/aiGenerateQuestionByJobDesc';
import { Question } from '@store/api/models/Questions.type';
import { getShuffledOptions } from '@utils/getShuffledOptions';
import { getUniqueQuestions } from '@utils/getUniqueQuestions';
import encryptNumber from '@utils/helpers/encryptNumber';
import getSecretKeyByDate from '@utils/helpers/getSecretKeyByDate';

interface getQuestionsByJobDescProps {
  jobTitle: string;
  jobDesc: string;
  numberQuestions: number;
  firstPartAnswers: number;
}

export async function getAnswerOptions(
  question: string
): Promise<{ answerIndex: number; shuffledOptions: string[] } | never> {
  try {
    const answers = await aiGenerateAnswerOptions(question);

    if (answers) {
      const answerIndex = Math.floor(Math.random() * 4);
      const shuffledOptions = getShuffledOptions(answerIndex, answers);

      return { answerIndex, shuffledOptions };
    } else {
      throw new Error(`Answer is empty`);
    }
  } catch (err: any) {
    throw new Error(`Error getAnswerOptions: ${err.message}`);
  }
}

async function getQuestionsByJobDesc({
  jobTitle,
  jobDesc,
  numberQuestions,
  firstPartAnswers,
}: getQuestionsByJobDescProps): Promise<Question[] | never> {
  const questions: Question[] = [];

  const firstQuestionList = await aiGenerateQuestionsByJobDesc({
    jobTitle,
    jobDesc,
    numberQuestions,
  });

  if (!firstQuestionList?.length) {
    throw new Error(`List of questions is empty`);
  }

  const uniqueQuestionList = getUniqueQuestions(firstQuestionList);

  if (uniqueQuestionList.length < numberQuestions) {
    const additionalQuestionList = await aiGenerateQuestionsByJobDesc({
      jobTitle,
      jobDesc,
      numberQuestions: numberQuestions - uniqueQuestionList.length,
      excludeQuestions: uniqueQuestionList,
    });

    uniqueQuestionList.push(...getUniqueQuestions(additionalQuestionList || [], uniqueQuestionList));
  }

  const generatedQuestionList = uniqueQuestionList.slice(0, numberQuestions);

  for (let i = 0; i < generatedQuestionList.length; i++) {
    const question = generatedQuestionList[i];

    if (i < firstPartAnswers) {
      const { answerIndex, shuffledOptions } = await getAnswerOptions(question);

      const date = Date.now().toString();
      const secretKey = getSecretKeyByDate(date);

      if (shuffledOptions.length) {
        questions[i] = {
          id: i,
          date,
          expression: question,
          answerIndex: encryptNumber(answerIndex, secretKey),
          answerUserIndex: -1,
          options: shuffledOptions,
          answerTime: 0,
          explanation: null,
          practicalApplication: null,
        };
      }
    } else {
      questions[i] = {
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
    }
  }

  return questions;
}

export default getQuestionsByJobDesc;
