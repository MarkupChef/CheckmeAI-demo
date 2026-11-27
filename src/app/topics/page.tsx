import TopicsPage from '@components/pages/TopicsPage';
import { getAllDataGSheets } from '@server/controllers/google-sheets-controller';
import { getMetaPage } from '@server/controllers/page-controller';
import { Topic } from '@types';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await getMetaPage(ROUTES.topics);

  return {
    title: `${PROJECT_NAME} | ${title}`,
    description: description || '',
  };
}

export default async function Topics() {
  let topics: Topic[] | [] = [];

  try {
    const { topics: topicList } = await getAllDataGSheets();
    topics = topicList;
  } catch (err: any) {
    console.error(err.message);
  }

  return <TopicsPage topics={topics} />;
}
