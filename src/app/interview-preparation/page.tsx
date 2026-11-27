import InterviewPreparationPage from '@components/pages/InterviewPreparationPage';
import { t } from '@i18n/server';
import { getModes } from '@server/controllers/mode-controller';
import { Mode } from '@types';
import { PROJECT_NAME } from '@utils/constants/constants';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return {
    title: `${PROJECT_NAME} | ${t('interview_preparation')}`,
  };
}

export default async function InterviewPreparation() {
  let modes: Mode[] | [] = [];

  try {
    modes = await getModes();
  } catch (err: any) {
    console.error(err.message);
  }

  return <InterviewPreparationPage modes={JSON.parse(JSON.stringify(modes))} />;
}
