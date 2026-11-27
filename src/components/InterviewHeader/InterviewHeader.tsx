import LevelIcon from '@components/LevelIcon/LevelIcon';
import TopicLogoPlaceholder from '@components/TopicCard/TopicLogoPlaceholder';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import styles from './interviewHeader.module.scss';

interface InterviewHeaderProps {
  topicName: string;
  topicIcon: string;
  level: string;
  counter: ReactNode;
}

const InterviewHeader: FC<InterviewHeaderProps> = ({ topicName, topicIcon, level, counter }) => {
  const interviewTopic = (
    <div className={styles.interviewTopic}>
      <div className={styles.interviewTopicTitleIcon}>
        {topicIcon ? (
          <Image src={topicIcon} alt={topicName || ''} width={24} height={24} />
        ) : (
          <TopicLogoPlaceholder name={topicName} className={'!text-[1rem]'} />
        )}
      </div>
      <span className={styles.interviewTopicTitle}>{topicName}</span>
    </div>
  );

  const interviewLevel = level ? (
    <div className={styles.interviewLevel}>
      <div className={styles.interviewTopicLevelIcon}>
        <LevelIcon level={level} />
      </div>
      <span className={styles.interviewLevelTitle}>{level}</span>
    </div>
  ) : null;

  return (
    <Card className={styles.root}>
      {interviewTopic}
      {interviewLevel}
      <div className={styles.counter}>{counter}</div>
    </Card>
  );
};

export default InterviewHeader;
