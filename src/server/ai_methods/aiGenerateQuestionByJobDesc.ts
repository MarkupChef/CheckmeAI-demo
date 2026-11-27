import { OPENAI_MODEL } from '@utils/constants/environments';
import loadPromptTemplate from '@utils/helpers/loadPromptTemplate';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import configOpenAI from '../../../openai.config';

interface aiGenerateQuestionsByJobDescProps {
  jobTitle: string;
  jobDesc: string;
  numberQuestions: number;
  excludeQuestions?: string[];
}

export async function aiGenerateQuestionsByJobDesc({
  jobTitle,
  jobDesc,
  numberQuestions,
  excludeQuestions = [],
}: aiGenerateQuestionsByJobDescProps): Promise<string[] | null> {
  const MathResponse = z.object({
    questions: z.array(z.string()),
  });

  const role = loadPromptTemplate('questionsGeneration.prompt.md');
  let message = `Job Title: ${jobTitle}. Job Requirements: ${jobDesc}. Number of Questions: ${numberQuestions}.`;

  if (excludeQuestions.length) {
    message += ` Do not repeat these questions: ${JSON.stringify(excludeQuestions)}.`;
  }

  try {
    const openai = new OpenAI(configOpenAI);

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      reasoning_effort: 'none',
      temperature: 0.7,
      max_completion_tokens: 4000,
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

    return JSON.parse(data).questions as string[];
  } catch (e: any) {
    const errorMessage = e.constructor.name === 'LengthFinishReasonError' ? `Too many tokens: ${e.message}` : e.message;

    throw new Error(`Error getting questions: ${errorMessage}`);
  }
}
