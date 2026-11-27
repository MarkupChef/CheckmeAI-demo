import TopicLevelPage from '@components/pages/TopicLevelPage';
import { t } from '@i18n/server';
import { getTopic, getTopics } from '@server/controllers/topic-controller';
import { Topic } from '@types';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const revalidate = 86400;

interface TopicSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const topics = await getTopics();

  return topics.map((topic: Topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopic(slug);

  if (!topic) {
    return {};
  }

  return {
    title: `${PROJECT_NAME} | ${topic.name} ${t('interview')} - ${t('choosing_the_level')}`,
    description: t('choosing_level_description', { topicName: topic.name }),
  };
}

export default async function TopicSlug({ params }: TopicSlugProps) {
  const { slug } = await params;
  const topic = await getTopic(slug);

  if (!topic) {
    permanentRedirect(ROUTES.topics);
  }

  return <TopicLevelPage dataTopic={topic} />;
}
