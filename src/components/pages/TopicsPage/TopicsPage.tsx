'use client';

import SimpleTopicList from '@components/TopicList/SimpleTopicList';
import TopicSearch from '@components/TopicSearch';
import H1 from '@components/UI/H1';
import useTopicPage from '@components/pages/TopicsPage/useTopicPage';
import useAppDispatch from '@hooks/useAppDispatch';
import useIsRehydrated from '@hooks/useIsRehydrated';
import { setModeId } from '@store/interviewSlice';
import { Topic } from '@types';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './topicsPage.module.scss';

export const RESULT_CONTAINER_ID = 'topicSearchResults';

interface TopicsPageProps {
  topics: Topic[];
}

const TopicsPage: FC<TopicsPageProps> = ({ topics }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { search, setSearch, filteredTopics } = useTopicPage({ topics });

  const isRehydrated = useIsRehydrated();

  useEffect(() => {
    const isEditTopic = new URLSearchParams(window.location.search).has('edit');

    if (isRehydrated && !isEditTopic) {
      dispatch(setModeId({ modeId: null }));
    }
  }, [isRehydrated]);

  const hasTopics = filteredTopics.length > 0;

  const renderNoTopics = () => <div className={'text-center'}>{t('there_are_no_topics')}</div>;

  const renderSearchResult = () => (
    <>
      <div id="searchStatus" className={'sc-only'} aria-live="polite">
        {hasTopics ? t('topic_search_result', { value: filteredTopics.length }) : t('there_are_no_topics')}
      </div>
      <div id={RESULT_CONTAINER_ID} aria-live={'polite'}>
        {hasTopics ? <SimpleTopicList topics={filteredTopics} /> : renderNoTopics()}
      </div>
    </>
  );

  return (
    <div className={styles.root}>
      <H1>{t('Choose_topic')}</H1>

      <TopicSearch setSearch={setSearch} className={styles.search} />

      {search ? (
        renderSearchResult()
      ) : (
        <div>{hasTopics ? <SimpleTopicList topics={filteredTopics} /> : renderNoTopics()}</div>
      )}
    </div>
  );
};

export default TopicsPage;
