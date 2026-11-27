import answerOptionsPrompt from '@server/prompts/answerOptionsPrompt';
import { NUMBER_OF_ATTEMPTS_REMAKE_OPTIONS } from '@utils/constants/constants';
import { OPENAI_MODEL } from '@utils/constants/environments';
import { getShuffledOptions } from '@utils/getShuffledOptions';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import configOpenAI from '../../../openai.config';

export async function getAnswers(topicName: string, question: string): Promise<string[] | any> {
  const MathResponse = z.object({
    options: z.array(z.string()),
  });

  const { role, message } = answerOptionsPrompt.get(topicName, question);
  const openai = new OpenAI(configOpenAI);

  let countRequest = 0;

  try {
    const completion = await openai.chat.completions.parse({
      model: OPENAI_MODEL,
      reasoning_effort: 'none',
      temperature: 0.9,
      max_completion_tokens: 500,
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

    const dataArray = math_response?.parsed?.options;

    if (dataArray) {
      if (dataArray.length !== 4 && countRequest < NUMBER_OF_ATTEMPTS_REMAKE_OPTIONS) {
        countRequest++;

        return await getAnswers(topicName, question);
      }

      if (countRequest >= NUMBER_OF_ATTEMPTS_REMAKE_OPTIONS) {
        countRequest = 0;

        return null;
      }

      return dataArray;
    }
  } catch (e: any) {
    const errorMessage = e.constructor.name === 'LengthFinishReasonError' ? `Too many tokens: ${e.message}` : e.message;

    throw new Error(`Error getting answers: ${errorMessage}`);
  }
}

export async function getOptions(
  topicName: string,
  question: string
): Promise<{ answerIndex: number; shuffledOptions: string[] } | never> {
  try {
    const answers = await getAnswers(topicName, question);

    if (answers) {
      const answerIndex = Math.floor(Math.random() * 4);
      const shuffledOptions = getShuffledOptions(answerIndex, answers);

      return { answerIndex, shuffledOptions };
    } else {
      throw new Error(`Answer is empty`);
    }
  } catch (err: any) {
    throw new Error(`Error getOptions: ${err.message}`);
  }
}
