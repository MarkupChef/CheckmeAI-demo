import QuestionPage from '@components/pages/QuestionPage';
import QuestionPageByJobDesc from '@components/pages/QuestionPageByJobDesc';
import { t } from '@i18n/server';
import { authOptions } from '@server/auth';
import { getTransaction } from '@server/controllers/transaction-controller';
import { INTERVIEW_TYPE_TOPIC, PROJECT_NAME, TRANSACTION_MODE_STATUSES } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { permanentRedirect } from 'next/navigation';

interface ModeIdProps {
  params: Promise<{ mode_id: string }>;
  searchParams: Promise<{ type?: string }>;
}

export function generateMetadata(): Metadata {
  return {
    title: `${PROJECT_NAME} | ${t('Interview')}`,
  };
}

export default async function Mode_id({ params, searchParams }: ModeIdProps) {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.user_id as string;
  const { mode_id } = await params;
  const { type } = await searchParams;
  const isTopic = type === INTERVIEW_TYPE_TOPIC;

  let startedMode: any = null;
  let interviewStatus = '';

  // check started or in progress interview
  try {
    const transaction = await getTransaction({
      user_id,
      mode: mode_id,
      mode_status: {
        $in: [TRANSACTION_MODE_STATUSES.STARTED, TRANSACTION_MODE_STATUSES.IN_PROGRESS],
      },
    });
    startedMode = transaction?.mode;
    interviewStatus = transaction?.mode_status || '';
  } catch (err: any) {
    console.error(err.message);
  }

  if (!startedMode || startedMode._id?.toString() !== mode_id) {
    permanentRedirect(isTopic ? ROUTES.topics : ROUTES.job_vacancy);
  }

  const mode = JSON.parse(JSON.stringify(startedMode));

  return isTopic ? (
    <QuestionPage startedMode={mode} interviewStatus={interviewStatus} />
  ) : (
    <QuestionPageByJobDesc startedMode={mode} interviewStatus={interviewStatus} />
  );
}
