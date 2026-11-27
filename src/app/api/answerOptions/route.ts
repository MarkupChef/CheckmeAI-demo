import { getAnswerOptions } from '@server/services/question.service';
import encryptNumber from '@utils/helpers/encryptNumber';
import getSecretKeyByDate from '@utils/helpers/getSecretKeyByDate';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const question = request.nextUrl.searchParams.get('question');

    if (question) {
      const { answerIndex, shuffledOptions } = await getAnswerOptions(question);
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
