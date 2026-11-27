'use client';

import H1 from '@components/UI/H1';
import InterviewsPage from '@components/pages/InterviewsPage';
import InterviewsPageByJobDesc from '@components/pages/InterviewsPageByJobDesc';
import { InterviewsPageProps } from '@types';
import { INTERVIEWS_TAB_TOPICS } from '@utils/constants/constants';
import { Segmented } from 'antd';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './interviewsTabsPage.module.scss';

const INTERVIEWS_TAB_JOB_VACANCIES = 'job-vacancies';

const InterviewsTabsPage: FC<InterviewsPageProps> = ({ interviews, topicInterviews, topics }) => {
  const { t } = useTranslation();
  const pathname = usePathname() || '';
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState(
    searchParams?.get('tab') === INTERVIEWS_TAB_TOPICS ? INTERVIEWS_TAB_TOPICS : INTERVIEWS_TAB_JOB_VACANCIES
  );

  const onChangeTab = (key: string) => {
    setActiveTab(key);
    window.history.replaceState(null, '', key === INTERVIEWS_TAB_TOPICS ? `${pathname}?tab=${key}` : pathname);
  };

  const tabOptions = [
    { value: INTERVIEWS_TAB_JOB_VACANCIES, label: t('Interviews.tab_job_vacancies') },
    { value: INTERVIEWS_TAB_TOPICS, label: t('Interviews.tab_topics') },
  ];

  const hasInterviews = interviews?.length > 0 || topicInterviews?.length > 0;

  return (
    <div className={'mx-auto w-full max-w-6xl'}>
      <H1>{t('My_interviews')}</H1>

      {hasInterviews ? (
        <>
          <Segmented
            block
            size={'large'}
            value={activeTab}
            onChange={onChangeTab}
            options={tabOptions}
            className={styles.segmented}
          />
          {activeTab === INTERVIEWS_TAB_TOPICS ? (
            <InterviewsPage interviews={topicInterviews} topics={topics} />
          ) : (
            <InterviewsPageByJobDesc interviews={interviews} />
          )}
        </>
      ) : (
        <InterviewsPage interviews={topicInterviews} topics={topics} />
      )}
    </div>
  );
};

export default InterviewsTabsPage;
