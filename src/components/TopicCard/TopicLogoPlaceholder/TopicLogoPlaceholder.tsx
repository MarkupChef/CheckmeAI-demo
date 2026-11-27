import { FC } from 'react';
import styles from './topicLogoPlaceholder.module.scss';

interface TopicLogoPlaceholderProps {
  name: string;
  className?: string;
}

const TopicLogoPlaceholder: FC<TopicLogoPlaceholderProps> = ({ name, className = '' }) => {
  const firstLetterOfName = name.charAt(0).toUpperCase();

  return <div className={`${styles.root} ${className}`}>{firstLetterOfName}</div>;
};

export default TopicLogoPlaceholder;
