import JobVacancyPage from '@components/pages/JobDescriptionPage';
import { PROJECT_NAME } from '@utils/constants/constants';
import type { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Job Description`,
};

export default function JobVacancy() {
  return <JobVacancyPage />;
}
