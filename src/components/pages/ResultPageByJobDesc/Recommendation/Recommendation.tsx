import Chat from '@components/Chat';
import { useGetRecommendationQuery } from '@store/api/recommendationApi';
import { Card } from 'flowbite-react';
import { FC, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './recommendation.module.scss';

interface RecommendationProps {
  interviewId: string;
  recommendation?: string;
  callback?: () => void;
}

const Recommendation: FC<RecommendationProps> = ({ interviewId, recommendation }) => {
  const { t } = useTranslation();
  const actionPanelRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError, error } = useGetRecommendationQuery({ interviewId }, { skip: !!recommendation });

  if (process.env.NODE_ENV === 'development' && isError) {
    console.error('Recommendation.tsx, error:', error);
  }

  const content = useMemo(() => {
    if (!data) {
      return null;
    }

    return <div dangerouslySetInnerHTML={{ __html: data }} />;
  }, [data]);

  if (recommendation) {
    return (
      <div ref={actionPanelRef}>
        <Card className={styles.chatCard}>
          <Chat>
            <div dangerouslySetInnerHTML={{ __html: recommendation }} />
          </Chat>
        </Card>
      </div>
    );
  }

  return (
    <>
      {(data || isLoading || isError) && (
        <Card className={styles.chatCard}>
          <Chat isLoading={isLoading} error={isError ? t('error_getting_recommendation') : ''}>
            {content}
          </Chat>
        </Card>
      )}
    </>
  );
};

export default Recommendation;
