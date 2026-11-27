import useAppSelector from '@hooks/useAppSelector';
import { INTERVIEW_TYPE_TOPIC } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styles from './continueInterview.module.scss';

const ContinueInterview = () => {
  const { t } = useTranslation();
  const pathname = usePathname() || '';

  const { modeId, started, topic } = useAppSelector((state) => state.questions);

  const isInterviewRoute = pathname.startsWith(ROUTES.interview) && !pathname.startsWith(ROUTES.interviews);
  const isShowButton = !isInterviewRoute && modeId && started;
  const query = topic ? `?type=${INTERVIEW_TYPE_TOPIC}` : '';

  if (isShowButton) {
    return (
      <Link href={`${ROUTES.interview}/${modeId}${query}`} className={styles.root}>
        {t('continue_interview')}
      </Link>
    );
  }

  return null;
};

export default ContinueInterview;
