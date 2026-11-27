import TopicLogoPlaceholder from '@components/TopicCard/TopicLogoPlaceholder';
import { Typography } from 'antd';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import { FC, useState } from 'react';
import { topicCardTheme } from './theme.fb';
import styles from './topicCard.module.scss';

const { Text } = Typography;

interface TopicCardProps {
  name: string;
  image: string;
}

const MAX_NAME_LENGTH = 11;

const TopicCard: FC<TopicCardProps> = ({ name, image }) => {
  const [isImageError, setIsImageError] = useState(false);
  const words = name.split(' ');

  return (
    <Card theme={topicCardTheme}>
      <div className={styles.logo}>
        {image && !isImageError ? (
          <Image
            src={image}
            width={80}
            height={80}
            alt={`${name} logo`}
            priority={true}
            onError={() => setIsImageError(true)}
          />
        ) : (
          <TopicLogoPlaceholder name={name} className={styles.logoPlaceholder} />
        )}
      </div>
      {words.length === 1 && name.length > MAX_NAME_LENGTH ? (
        <Text className={styles.name} ellipsis={{ tooltip: name }}>
          {name}
        </Text>
      ) : (
        <h5 className={styles.name}>{name}</h5>
      )}
    </Card>
  );
};

export default TopicCard;
