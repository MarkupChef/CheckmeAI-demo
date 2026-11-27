import CertificatePage from '@components/pages/CertificatePage';
import { t } from '@i18n/server';
import { authOptions } from '@server/auth';
import { getInterviewById } from '@server/controllers/interview-controller';
import { getTopic } from '@server/controllers/topic-controller';
import { Interview } from '@types';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import sharp from 'sharp';

interface CertificateProps {
  params: Promise<{ id: string }>;
}

export function generateMetadata(): Metadata {
  return {
    title: `${PROJECT_NAME} | ${t('download_certificate')}`,
  };
}

async function svgToPng(url: string): Promise<string> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = await sharp(Buffer.from(arrayBuffer)).png().toBuffer();

  return `data:image/png;base64,${buffer.toString('base64')}`;
}

export default async function Certificate({ params }: CertificateProps) {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.user_id as string;
  const { id } = await params;

  let topicLogoBase64 = null;

  const redirectLink = `${ROUTES.interviews}/${id}`;

  let interview = null;
  let topic = null;

  try {
    interview = (await getInterviewById(id, user_id)) as Interview;
  } catch (err: any) {
    console.error(err.message);
  }

  if (!interview?.passed || !interview.mode?.is_certificate) {
    redirect(redirectLink);
  }

  try {
    topic = await getTopic(interview.topic_slug);

    if (topic) {
      topicLogoBase64 = await svgToPng(topic.image);
    }
  } catch (err: any) {
    console.error(err.message);

    redirect(redirectLink);
  }

  return (
    <CertificatePage
      interview={JSON.parse(JSON.stringify(interview))}
      topic={topic ?? null}
      topicLogoBase64={topicLogoBase64}
    />
  );
}
