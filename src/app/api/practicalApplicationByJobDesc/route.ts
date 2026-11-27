import { aiGeneratePracticalApplication } from '@server/ai_methods/aiGeneratePracticalApplication';
import { authOptions } from '@server/auth';
import { getInterviewWithTitleById } from '@server/controllers/interview-controller';
import { savePracticalApplication } from '@server/controllers/pracrical-application-controller';
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
      return NextResponse.json(
        { message: 'Error of payload data for getting practical application by job desc' },
        { status: 400 }
      );
    }

    const interviewWithTitle = await getInterviewWithTitleById(interviewId, userId);

    if (!interviewWithTitle) {
      return NextResponse.json({ message: 'Interview not found' }, { status: 404 });
    }

    const { interview, title: jobTitle } = interviewWithTitle;
    const question = interview.questions[indexQuestion];
    const expression = question.expression;
    const answer = question.options[question.answerIndex] as string;

    const generatedPracticalApplication = await aiGeneratePracticalApplication({
      jobTitle,
      question: expression,
      answer,
    });

    // TODO: for the test
    // const generatedPracticalApplication = 'GeneratedPracticalApplication';

    const updatedInterview = await savePracticalApplication(
      interviewId,
      indexQuestion,
      generatedPracticalApplication,
      userId
    );

    const practicalApplication = updatedInterview.questions[indexQuestion].practicalApplication as string;

    return NextResponse.json(practicalApplication);
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
