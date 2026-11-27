'use client';

import BackLink from '@components/BackLink';
import JuniorIcon from '@components/Icons/JuniorIcon';
import MiddleIcon from '@components/Icons/MiddleIcon';
import SeniorIcon from '@components/Icons/SeniorIcon';
import H1 from '@components/UI/H1';
import useAppDispatch from '@hooks/useAppDispatch';
import useIsRehydrated from '@hooks/useIsRehydrated';
import { setTopicIcon, setTopicName, setTopicSlug } from '@store/interviewSlice';
import { LevelTypes, Topic } from '@types';
import { ROUTES } from '@utils/constants/routes';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LevelCard from '../../LevelCard';
import styles from './topicLevelPage.module.scss';

interface TopicLevelPageProps {
  dataTopic: Topic;
}

const TopicLevelPage: FC<TopicLevelPageProps> = ({ dataTopic }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const topicSlug = dataTopic.slug;

  const isRehydrated = useIsRehydrated();

  useEffect(() => {
    if (!isRehydrated) {
      return;
    }

    dispatch(setTopicSlug({ slug: dataTopic.slug }));
    dispatch(setTopicName({ name: dataTopic.name }));
    dispatch(setTopicIcon({ icon: dataTopic.image }));
  }, [isRehydrated, dataTopic.slug]);

  const levelList = [
    {
      name: t('Junior'),
      icon: <JuniorIcon />,
      slug: 'junior',
      level: 'junior',
    },
    {
      name: t('Middle'),
      icon: <MiddleIcon />,
      slug: 'middle',
      level: 'middle',
    },
    {
      name: t('Senior'),
      icon: <SeniorIcon />,
      slug: 'senior',
      level: 'senior',
    },
  ];

  const renderLevelList = () => (
    <ul className={styles.list}>
      {levelList.map((level, index) => (
        <li key={index}>
          <Link href={`${ROUTES.topics}/${topicSlug}/${level.slug}`} className={styles.linkItem}>
            <LevelCard level={level.level as LevelTypes} name={level.name} />
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <h3 className={styles.supTitle}>{dataTopic.name}</h3>
      <H1>{t('Choose_level')}</H1>
      {renderLevelList()}
      <BackLink href={ROUTES.topics} className={styles.backButton}>
        {t('back_to_topics')}
      </BackLink>
    </>
  );
};

export default TopicLevelPage;
