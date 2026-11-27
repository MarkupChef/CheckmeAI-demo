import { ArrowRightOutlined } from '@ant-design/icons';
import CAIClipboardCheckIcon from '@components/Icons/CAIClipboardCheckIcon';
import DoubleArrowButtonIcon from '@components/Icons/DoubleArrowButtonIcon';
import IntroCard from '@components/IntroCard';
import useClientMediaQuery from '@hooks/useClientMediaQuery';
import { ROUTES } from '@utils/constants/routes';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './introSection.module.scss';

const IntroSection = ({ topicLength }: { topicLength: number }) => {
  const { t } = useTranslation();
  const isMobile = useClientMediaQuery('(max-width: 767px)');

  return (
    <section className={styles.root}>
      <div className={styles.infoCard}>
        <IntroCard />
      </div>

      <div className={styles.cardsContainer}>
        <Card className={styles.card}>
          <div className={styles.cardInner}>
            <div className={styles.cardTitle}>{topicLength}</div>
            <div className={styles.cardDescription}>{t('topics')}</div>
          </div>
        </Card>
        <Card className={styles.card}>
          <div className={styles.cardInner}>
            <div className={styles.cardTitle}>3</div>
            <div className={styles.cardDescription}>{t('modes')}</div>
          </div>
        </Card>
        <Card className={styles.card}>
          <div className={styles.cardInner}>
            <CAIClipboardCheckIcon className={styles.cardIcon} />
            <div className={styles.cardDescription}>{t('ai_certificate')}</div>
          </div>
        </Card>
      </div>

      <div className={styles.btn}>
        <Link href={ROUTES.job_vacancy} className={'inline-block'}>
          <Button size={isMobile ? 'md' : 'lg'} className={isMobile ? 'btn-md' : 'btn-lg'} color={'primary'}>
            Insert Job description
            <ArrowRightOutlined className={styles.btnIcon} />
          </Button>
        </Link>
      </div>

      <div className={styles.arrow}>
        <DoubleArrowButtonIcon className={styles.arrowIcon} />
      </div>
    </section>
  );
};

export default IntroSection;
