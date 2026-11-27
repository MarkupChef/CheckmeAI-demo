import useAppDispatch from '@hooks/useAppDispatch';
import { setLevel, setTopicName, setTopicSlug } from '@store/interviewSlice';
import { Topic } from '@types';
import { ROUTES } from '@utils/constants/routes';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './topicContentPage.module.scss';

interface TopicLevelPageProps {
  level?: string;
  dataTopic: Topic;
  content: string;
}

const TopicContentPage: FC<TopicLevelPageProps> = ({ level, dataTopic, content }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const link = `${ROUTES.topics}/${dataTopic.slug}${level ? `/${level}` : ''}`;

  dispatch(setTopicSlug({ slug: dataTopic.slug }));
  dispatch(setTopicName({ name: dataTopic.name }));

  if (level) {
    dispatch(setLevel({ level }));
  }

  const btnText = t('start_topic_interview', { topicName: dataTopic.name });

  return (
    <>
      {content && (
        <div className={styles.root}>
          <div className={styles.content}>
            <div className={styles.contentHTML} dangerouslySetInnerHTML={{ __html: content }} />

            <Link href={link} className={styles.btnLink}>
              <Button size={'md'} className={'btn-md'} color={'primary'}>
                {btnText}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TopicContentPage;
