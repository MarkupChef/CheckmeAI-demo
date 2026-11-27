import PricePage from '@components/pages/PricePage';
import { getModes } from '@server/controllers/mode-controller';
import { getMetaPage } from '@server/controllers/page-controller';
import { Price } from '@types';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await getMetaPage(ROUTES.price);

  return {
    title: `${PROJECT_NAME} | ${title}`,
    description: description || '',
  };
}

export default async function Prices() {
  let prices: Price[] | null = null;

  // getting just mode list for not auth user (without available info)
  try {
    prices = await getModes();
  } catch (err: any) {
    console.error(err.message);
  }

  return <PricePage prices={JSON.parse(JSON.stringify(prices))} />;
}
