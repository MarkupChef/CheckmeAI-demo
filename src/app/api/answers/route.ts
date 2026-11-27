import { getOptions } from '@server/controllers/anwers-controller';
import encryptNumber from '@utils/helpers/encryptNumber';
import getSecretKeyByDate from '@utils/helpers/getSecretKeyByDate';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  try {
    const question = request.nextUrl.searchParams.get('question');
    const topic = request.nextUrl.searchParams.get('topic');

    if (question && topic) {
      const { answerIndex, shuffledOptions } = await getOptions(topic, question);
      const date = Date.now().toString();
      const secretKey = getSecretKeyByDate(date);

      return NextResponse.json({
        date,
        index: encryptNumber(answerIndex, secretKey),
        options: shuffledOptions,
      });
    }

    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
