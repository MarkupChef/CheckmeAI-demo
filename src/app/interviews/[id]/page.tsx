import ResultPage from '@components/pages/ResultPage';
import ResultPageByJobDesc from '@components/pages/ResultPageByJobDesc';
import { t } from '@i18n/server';
import { authOptions } from '@server/auth';
import { getInterviewById, getInterviewByJobDescById } from '@server/controllers/interview-controller';
import { getTopic } from '@server/controllers/topic-controller';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { cache } from 'react';

interface InterviewIdProps {
  params: Promise<{ id: string }>;
}

const getInterviewData = cache(async (id: string) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.user_id as string;

  let interview = null;
  let topic = null;

  try {
    interview = await getInterviewByJobDescById(id, user_id).catch(() => null);

    if (!interview) {
      interview = await getInterviewById(id, user_id);
      topic = await getTopic(interview.topic_slug);

      if (!topic) {
        throw new Error(`Topic ${interview.topic_slug} is not found.`);
      }
    }
  } catch (err: any) {
    console.error(err.message);

    return null;
  }

  return { interview: JSON.parse(JSON.stringify(interview)), topic: topic ?? null };
});

export async function generateMetadata({ params }: InterviewIdProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getInterviewData(id);

  if (!data) {
    return {};
  }

  const { interview, topic } = data;
  const value = topic ? `${interview.level} ${topic.name}` : `${interview.jobTitle} ${interview.companyName}`;

  return {
    title: `${PROJECT_NAME} | ${t('My_interview', { value })}`,
  };
}

export default async function InterviewId({ params }: InterviewIdProps) {
  const { id } = await params;
  const data = await getInterviewData(id);

  if (!data) {
    redirect(ROUTES.interviews);
  }

  const { interview, topic } = data;

  if (topic) {
    const { _id, level, questions, passed, mode, recommendation } = interview;

    return (
      <ResultPage
        interviewId={_id}
        isPassed={passed}
        topicName={topic.name}
        topicImage={topic.image}
        topicSlug={topic.slug}
        level={level}
        questions={questions}
        mode={mode}
        recommendation={recommendation}
      />
    );
  }

  const { _id, jobTitle, companyName, jobDesc, questions, passed, mode, recommendation } = interview;

  return (
    <ResultPageByJobDesc
      interviewId={_id}
      isPassed={passed}
      jobTitle={jobTitle}
      companyName={companyName}
      jobDesc={jobDesc}
      questions={questions}
      mode={mode}
      recommendation={recommendation}
    />
  );
}
