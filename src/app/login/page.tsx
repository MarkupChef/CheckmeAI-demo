import LoadingIcon from '@components/Icons/LoadingIcon';
import LoginPage from '@components/pages/LoginPage';
import { getMetaPage } from '@server/controllers/page-controller';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await getMetaPage(ROUTES.login);

  return {
    title: `${PROJECT_NAME} | ${title}`,
    description: description || '',
  };
}

export default function Login() {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <LoginPage />
    </Suspense>
  );
}
