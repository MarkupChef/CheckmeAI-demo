import { OPENAI_MODEL } from '@utils/constants/environments';
import loadPromptTemplate from '@utils/helpers/loadPromptTemplate';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import configOpenAI from '../../../openai.config';

interface aiCheckJobRequirementsProps {
  jobTitle: string;
  jobDesc: string;
}

export async function aiCheckJobRequirements({
  jobTitle,
  jobDesc,
}: aiCheckJobRequirementsProps): Promise<boolean | null> {
  const MathResponse = z.object({
    valid: z.boolean(),
  });

  const openai = new OpenAI(configOpenAI);

  try {
    const role = loadPromptTemplate('checkJobRequirements.prompt.md');
    const message = `Job Title: ${jobTitle}. Job Requirements: ${jobDesc}.`;

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      reasoning_effort: 'none',
      temperature: 0.1,
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
      throw new Error(`Error refusal of checking Job Requirements: ${math_response.refusal}`);
    }

    const data = math_response?.content;

    if (!data) {
      throw new Error(`Error refusal of checking review: data is empty`);
    }

    return !!JSON.parse(data).valid;
  } catch (err: any) {
    throw new Error(`Error checking review: ${err.message}`);
  }
}
