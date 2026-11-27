import { authOptions } from '@server/auth';
import { getRecommendation } from '@server/controllers/recommendation-controller';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.user_id;

  if (!userId) {
    return NextResponse.json({ message: 'User is not authorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const interviewId = body?.interviewId;

    if (!interviewId) {
      return NextResponse.json({ message: 'Error of payload data for getting recommendation' }, { status: 400 });
    }

    const result = await getRecommendation(interviewId, userId);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
