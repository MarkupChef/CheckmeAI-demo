import { OPENAI_MODEL } from '@utils/constants/environments';
import loadPromptTemplate from '@utils/helpers/loadPromptTemplate';
import OpenAI from 'openai';
import configOpenAI from '../../../openai.config';

interface aiGenerateExplanationParams {
  jobTitle: string;
  question: string;
  answer: string;
}

export async function aiGenerateExplanation({
  jobTitle,
  question,
  answer,
}: aiGenerateExplanationParams): Promise<string | null> {
  const openai = new OpenAI(configOpenAI);

  try {
    const role = loadPromptTemplate('explanationGeneration.prompt.md');
    const message = `Job Title: ${jobTitle}. Question: ${question}. Answer: ${answer}.`;

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      reasoning_effort: 'none',
      temperature: 1,
      max_completion_tokens: 750,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: [
        { role: 'system', content: role },
        { role: 'user', content: message },
      ],
    });

    if (completion.choices[0].message.content) {
      return completion.choices[0].message.content;
    }

    return null;
  } catch (err: any) {
    throw new Error(`Error generate explanation: ${err.message}`);
  }
}
