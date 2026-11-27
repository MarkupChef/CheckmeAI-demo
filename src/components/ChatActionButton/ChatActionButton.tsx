import { FC } from 'react';
import styles from './chatActionButton.module.scss';

interface ChatActionButtonProps {
  title: string;
  isActive: boolean;
}

const ChatActionButton: FC<ChatActionButtonProps> = ({ title, isActive }) => {
  return (
    <div className={isActive ? styles.active : styles.root} role={'button'}>
      <span className={styles.text}>{title}</span>
    </div>
  );
};

export default ChatActionButton;
