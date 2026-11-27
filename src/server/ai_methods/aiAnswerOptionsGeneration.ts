import { NUMBER_OF_ATTEMPTS_REMAKE_OPTIONS } from '@utils/constants/constants';
import { OPENAI_MODEL } from '@utils/constants/environments';
import loadPromptTemplate from '@utils/helpers/loadPromptTemplate';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import configOpenAI from '../../../openai.config';

export default async function aiGenerateAnswerOptions(question: string): Promise<string[] | any> {
  const MathResponse = z.object({
    options: z.array(z.string()),
  });

  const role = loadPromptTemplate('answerOptionsGeneration.prompt.md');
  const message = `Question: ${question}`;

  let countRequest = 0;

  try {
    const openai = new OpenAI(configOpenAI);

    const completion = await openai.chat.completions.create({
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
    const data = math_response?.content;

    if (!data) {
      return null;
    }

    const dataArray = JSON.parse(data).options as string[];

    if (dataArray) {
      if (dataArray.length !== 4 && countRequest < NUMBER_OF_ATTEMPTS_REMAKE_OPTIONS) {
        countRequest++;

        return await aiGenerateAnswerOptions(question);
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
