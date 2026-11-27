import PublicResultPage from '@components/pages/PublicResultPage';
import { t } from '@i18n/server';
import { getInterviewByHash, getInterviewByJobDescByHash } from '@server/controllers/interview-controller';
import { getTopic } from '@server/controllers/topic-controller';
import { getUserById } from '@server/controllers/user-controller';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { cache } from 'react';

interface PublicInterviewResultProps {
  searchParams: Promise<{ hash?: string }>;
}

const getPublicInterviewData = cache(async (hash: string | undefined) => {
  if (!hash) {
    return null;
  }

  let interview = null;
  let topic = null;
  let user = null;

  try {
    interview = await getInterviewByJobDescByHash(hash);

    if (!interview) {
      interview = await getInterviewByHash(hash);

      if (!interview) {
        return null;
      }

      topic = await getTopic(interview.topic_slug);
    }

    user = await getUserById(interview.user_id);
  } catch (err: any) {
    console.error(err.message);

    return null;
  }

  return {
    interview: JSON.parse(JSON.stringify(interview)),
    topic: topic ?? null,
    user: JSON.parse(JSON.stringify(user)),
  };
});

export async function generateMetadata({ searchParams }: PublicInterviewResultProps): Promise<Metadata> {
  const { hash } = await searchParams;
  const data = await getPublicInterviewData(hash);

  if (!data) {
    return {};
  }

  const { interview, topic, user } = data;

  return {
    title: `${PROJECT_NAME} | ${t('public_interview_result', {
      name: user.name,
      value: topic ? `${interview.level} ${topic.name}` : `${interview.jobTitle} ${interview.companyName}`,
    })}`,
  };
}

export default async function PublicInterviewResult({ searchParams }: PublicInterviewResultProps) {
  const { hash } = await searchParams;
  const data = await getPublicInterviewData(hash);

  if (!data) {
    permanentRedirect(ROUTES.root);
  }

  const { interview, topic, user } = data;
  const { _id, questions, level, jobTitle, companyName } = interview;

  return (
    <PublicResultPage
      interviewId={_id}
      topicName={topic?.name}
      topicImage={topic?.image}
      level={level}
      jobTitle={jobTitle}
      companyName={companyName}
      questions={questions}
      userName={user.name}
    />
  );
}
