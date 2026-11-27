import GrowArrow from '@components/SVG/GrowArrow';
import TopicLogoPlaceholder from '@components/TopicCard/TopicLogoPlaceholder';
import useClientMediaQuery from '@hooks/useClientMediaQuery';
import { Topic } from '@types';
import { PROJECT_NAME } from '@utils/constants/constants';
import Image from 'next/image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './topicsSection.module.scss';

interface TopicsSectionProps {
  topics: Topic[];
}

const TopicsSection: FC<TopicsSectionProps> = ({ topics }) => {
  const { t } = useTranslation();
  const isMobile = useClientMediaQuery('(max-width: 767px)');
  const topicsWithImg = topics.filter((topic) => topic.image);
  const items = isMobile ? [...topicsWithImg].slice(0, 12) : [...topicsWithImg].splice(0, 27);

  const topicList = (
    <ul className={styles.topicList}>
      {items.map((topic) => (
        <li key={topic.slug} className={styles.topicListItem}>
          <div className={styles.topic}>
            <div className={styles.topicIcon}>
              {topic.image ? (
                <Image src={topic.image} width={80} height={80} alt="" priority={true} />
              ) : (
                <TopicLogoPlaceholder name={topic.name} />
              )}
            </div>
            <h5 className={styles.topicTitle}>{topic.name}</h5>
          </div>
        </li>
      ))}
    </ul>
  );

  const numberTopics = (
    <div className={styles.topicCount}>
      <div className={styles.topicCountInner}>
        <div className={'m-auto'}>
          <div className={styles.topicCountNumber}>{topics.length}</div>
          <span className={styles.topicCountNumberLabel}>{t('topics')}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Wide range of topics for
          <br />
          <span className={'text-seagreen-500'}>Interview Preparation</span>
        </h2>
        <p className={styles.description}>
          {PROJECT_NAME} offers to prepare for technical interviews for the most popular programming languages today.
          Pass interviews in your field to become even more confident in a real interview.
        </p>
      </div>
      <div className={'relative'}>
        {topicList}
        <div className={styles.overview}></div>
        {numberTopics}
      </div>
      <div className={styles.decorIcon}>
        <GrowArrow />
      </div>
    </section>
  );
};

export default TopicsSection;
