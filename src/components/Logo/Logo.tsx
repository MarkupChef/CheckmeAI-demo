import LogoIcon from '@components/Icons/LogoIcon';
import { PROJECT_NAME } from '@utils/constants/constants';
import { useTranslation } from 'react-i18next';
import styles from './logo.module.scss';

const Logo = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <LogoIcon className={styles.icon} />
      <div className={styles.title}>
        <div className={styles.name}>{PROJECT_NAME}</div>
        <div className={styles.slogan}>{t('be_prepared')}</div>
      </div>
    </div>
  );
};

export default Logo;
