import JobVacancyReviewPage from '@components/pages/JobVacancyReviewPage';
import { getModes } from '@server/controllers/mode-controller';
import { Mode } from '@types';
import { PROJECT_NAME } from '@utils/constants/constants';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Job Vacancy Review`,
};

export default async function JobVacancyReview() {
  let modes: Mode[] | [] = [];

  try {
    modes = await getModes();
  } catch (err: any) {
    console.error(err.message);
  }

  return <JobVacancyReviewPage modes={JSON.parse(JSON.stringify(modes))} />;
}
