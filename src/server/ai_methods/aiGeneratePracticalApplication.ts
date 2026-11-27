import { OPENAI_MODEL } from '@utils/constants/environments';
import loadPromptTemplate from '@utils/helpers/loadPromptTemplate';
import OpenAI from 'openai';
import configOpenAI from '../../../openai.config';

interface aiGeneratePracticalApplicationParams {
  jobTitle: string;
  question: string;
  answer: string;
}

export async function aiGeneratePracticalApplication({
  jobTitle,
  question,
  answer,
}: aiGeneratePracticalApplicationParams): Promise<string> {
  const openai = new OpenAI(configOpenAI);

  try {
    const role = loadPromptTemplate('practicalApplicationGeneration.prompt.md');
    const message = `Job Title: ${jobTitle}. Question: ${question}. Answer: ${answer}.`;

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      reasoning_effort: 'none',
      temperature: 0.75,
      max_completion_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: [
        { role: 'system', content: role },
        { role: 'user', content: message },
      ],
    });

    if (!completion.choices[0].message.content) {
      throw new Error('No generated result.');
    }

    return completion.choices[0].message.content;
  } catch (err: any) {
    throw new Error(`Error practical application generation: ${err.message}`);
  }
}
