import InterviewsTabsPage from '@components/pages/InterviewsTabsPage';
import { t } from '@i18n/server';
import { authOptions } from '@server/auth';
import { getAllDataGSheets } from '@server/controllers/google-sheets-controller';
import { getInterviews, getInterviewsByJobDesc } from '@server/controllers/interview-controller';
import { PROJECT_NAME } from '@utils/constants/constants';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export function generateMetadata(): Metadata {
  return {
    title: `${PROJECT_NAME} | ${t('My_interviews')}`,
  };
}

export default async function Interviews() {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.user_id as string;

  let interviews = null;
  let topicInterviews = null;
  let topics = null;

  try {
    const interviewList = await getInterviewsByJobDesc({ user_id });
    interviews = JSON.parse(JSON.stringify(interviewList)) as any[];
    const topicInterviewList = await getInterviews({ user_id });
    topicInterviews = JSON.parse(JSON.stringify(topicInterviewList)) as any[];
  } catch (err: any) {
    console.error(err.message);
  }

  try {
    const { topics: topicList } = await getAllDataGSheets();
    topics = topicList;
  } catch (err: any) {
    console.error(err.message);
  }

  return (
    <InterviewsTabsPage
      interviews={interviews as any}
      topicInterviews={topicInterviews as any}
      topics={topics as any}
    />
  );
}
