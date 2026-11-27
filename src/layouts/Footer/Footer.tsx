import { ROUTES } from '@utils/constants/routes';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.root}>
      <div>Copyright &copy; {new Date().getFullYear()}</div>
      <ul className={styles.nav}>
        <li>
          <Link href={ROUTES.contacts}>{t('contacts')}</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
