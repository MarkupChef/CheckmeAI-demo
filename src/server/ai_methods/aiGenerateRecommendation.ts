import { recommendationPrompt } from '@promts';
import { OPENAI_MODEL } from '@utils/constants/environments';
import OpenAI from 'openai';
import configOpenAI from '../../../openai.config';

export async function aiGenerateRecommendation(topic: string, questions: string): Promise<string> {
  try {
    const openai = new OpenAI(configOpenAI);
    const { role, message } = recommendationPrompt.get(topic, questions);

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: role },
        { role: 'user', content: message },
      ],
      model: OPENAI_MODEL,
      reasoning_effort: 'none',
      temperature: 0.75,
      max_completion_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (!completion.choices[0].message.content) {
      throw new Error('No generated result.');
    }

    return completion.choices[0].message.content;
  } catch (err: any) {
    throw new Error(`Error generate recommendations: ${err.message}`);
  }
}
