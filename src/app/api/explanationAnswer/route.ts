import { aiGenerateExplanation } from '@server/ai_methods/aiGenerateExplanation';
import { authOptions } from '@server/auth';
import { saveExplanation } from '@server/controllers/explanation-controller';
import { getInterviewWithTitleById } from '@server/controllers/interview-controller';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.user_id;

  if (!userId) {
    return NextResponse.json({ message: 'User is not authorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const interviewId = body?.interviewId;
    const indexQuestion = body?.indexQuestion;

    if (!interviewId || !indexQuestion) {
      return NextResponse.json({ message: 'Error of payload data for getting explanation' }, { status: 400 });
    }

    const interviewWithTitle = await getInterviewWithTitleById(interviewId, userId);

    if (!interviewWithTitle) {
      return NextResponse.json({ message: 'Interview not found' }, { status: 404 });
    }

    const { interview, title: jobTitle } = interviewWithTitle;
    const question = interview.questions[indexQuestion];
    const expression = question.expression;
    const answer = question.options[question.answerIndex] as string;

    const generatedExplanation = await aiGenerateExplanation({
      jobTitle,
      question: expression,
      answer,
    });

    if (!generatedExplanation) {
      return NextResponse.json({ message: 'Generated explanation is null' }, { status: 400 });
    }

    const savedInterview = await saveExplanation(interviewId, indexQuestion, generatedExplanation, userId);
    const explanation = savedInterview.questions[indexQuestion].explanation;

    return NextResponse.json(explanation);
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
