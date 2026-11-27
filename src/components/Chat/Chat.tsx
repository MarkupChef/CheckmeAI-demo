import LoadingIcon from '@components/Icons/LoadingIcon';
import LogoIcon from '@components/Icons/LogoIcon';
import { PROJECT_NAME } from '@utils/constants/constants';
import { FC, ReactNode } from 'react';
import styles from './chat.module.scss';

interface ChatProps {
  title?: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
  error?: any;
}

const Chat: FC<ChatProps> = ({ title, children, isLoading, error }) => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>{isLoading ? <LoadingIcon className={styles.loading} /> : <LogoIcon />}</div>

        {title || <div className={styles.title}>{PROJECT_NAME}</div>}
      </header>
      <div className={styles.content}>{error ? <span className={styles.error}>{error}</span> : children}</div>
    </div>
  );
};

export default Chat;
