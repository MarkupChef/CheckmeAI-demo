import HomePage from '@components/pages/HomePage';
import { getAllDataGSheets } from '@server/controllers/google-sheets-controller';
import { getModes } from '@server/controllers/mode-controller';
import { getMetaPage } from '@server/controllers/page-controller';
import { Price, Topic } from '@types';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await getMetaPage(ROUTES.root);

  return {
    title: `${PROJECT_NAME} | ${title}`,
    description: description || '',
  };
}

export default async function Home() {
  let prices: Price[] | null = null;
  let topics: Topic[] | [] = [];

  try {
    const { topics: topicList } = await getAllDataGSheets();
    topics = topicList;
    prices = await getModes();
  } catch (err: any) {
    console.error(err.message);
  }

  return <HomePage topics={topics} prices={JSON.parse(JSON.stringify(prices))} />;
}
