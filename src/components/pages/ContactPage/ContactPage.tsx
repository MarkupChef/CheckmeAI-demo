'use client';

import LinkedInIcon from '@components/Icons/LinkedInIcon';
import { AUTHOR_LINKS } from '@utils/constants/constants';
import { Typography } from 'antd';
import { Card } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import styles from './contactPage.module.scss';

const { Title } = Typography;

const ContactPage = () => {
  const { t } = useTranslation();

  const renderAuthorList = () => (
    <ul className={styles.authorList}>
      {AUTHOR_LINKS.map(({ title, name, href }) => (
        <li key={href} className={styles.author}>
          <span className={styles.authorTitle}>{t(title)}</span>
          <a href={href} className={styles.authorLink} target="_blank" rel="noreferrer">
            <LinkedInIcon />
            {name}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.root}>
      <Card>
        <Title>Contacts</Title>
        {renderAuthorList()}
      </Card>
    </div>
  );
};

export default ContactPage;
