import TopicCard from '@components/TopicCard';
import useAppDispatch from '@hooks/useAppDispatch';
import { setTopicIcon, setTopicName, setTopicSlug } from '@store/interviewSlice';
import { Topic } from '@types';
import { ROUTES } from '@utils/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import styles from './simpleTopicList.module.scss';

interface SimpleTopicListProps {
  topics: Topic[];
}

const SimpleTopicList: FC<SimpleTopicListProps> = ({ topics }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isEditTopic, setIsEditTopic] = useState(false);

  useEffect(() => {
    setIsEditTopic(new URLSearchParams(window.location.search).has('edit'));
  }, []);

  const handleChooseTopic = async (name: string, slug: string, image: string) => {
    dispatch(setTopicSlug({ slug }));
    dispatch(setTopicName({ name }));
    dispatch(setTopicIcon({ icon: image }));

    await router.push(ROUTES.interview_preparation);
  };

  const renderList = () => {
    const availableTopics = topics.filter((item) => item.isAvailable);

    if (isEditTopic) {
      return availableTopics.map(({ name, slug, image }, index) => (
        <li key={index} className={styles.item}>
          <div onClick={() => handleChooseTopic(name, slug, image)} className={styles.topic}>
            <TopicCard name={name} image={image} />
          </div>
        </li>
      ));
    }

    return topics.map(({ name, slug, image }, index) => (
      <li key={index} className={styles.item}>
        <Link href={`.${ROUTES.topics}/${slug}`} className={styles.topic}>
          <TopicCard name={name} image={image} />
        </Link>
      </li>
    ));
  };

  return <ul className={styles.root}>{renderList()}</ul>;
};

export default SimpleTopicList;
