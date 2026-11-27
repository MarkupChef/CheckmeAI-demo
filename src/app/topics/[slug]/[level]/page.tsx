import ModePage from '@components/pages/ModePage';
import { t } from '@i18n/server';
import { getMetaPage } from '@server/controllers/page-controller';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const revalidate = 86400;

interface ModesProps {
  params: Promise<{ slug: string; level: string }>;
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: ModesProps): Promise<Metadata> {
  const { slug, level } = await params;
  const { title } = await getMetaPage(`/${slug}/${level}`);

  return {
    title: `${PROJECT_NAME} | ${title} ${t('interview')} - ${t('choosing_the_mode')}`,
    description: t('choosing_mode_description', { topicName: title }),
  };
}

export default async function Modes({ params }: ModesProps) {
  const { slug, level } = await params;
  const meta = await getMetaPage(`/${slug}/${level}`);

  if (!meta?.slug) {
    permanentRedirect(ROUTES.topics);
  }

  return <ModePage />;
}
