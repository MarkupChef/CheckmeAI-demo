import ContactPage from '@components/pages/ContactPage';
import { getMetaPage } from '@server/controllers/page-controller';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await getMetaPage(ROUTES.contacts);

  return {
    title: `${PROJECT_NAME} | ${title}`,
    description: description || '',
  };
}

export default function Contacts() {
  return <ContactPage />;
}
