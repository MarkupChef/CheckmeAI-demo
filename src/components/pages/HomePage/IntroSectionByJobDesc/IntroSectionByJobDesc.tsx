import { ArrowRightOutlined } from '@ant-design/icons';
import DoubleArrowButtonIcon from '@components/Icons/DoubleArrowButtonIcon';
import IntroCard from '@components/IntroCard';
import { ROUTES } from '@utils/constants/routes';
import { Button, ConfigProvider, Segmented } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../../../../colors';
import styles from './IntroSectionByJobDesc.module.scss';

type IntroMode = 'job_desc' | 'topic';

const MODE_ROUTES: Record<IntroMode, string> = {
  job_desc: ROUTES.job_vacancy,
  topic: ROUTES.topics,
};

const IntroSectionByJobDesc = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<IntroMode>('job_desc');

  return (
    <section className={styles.root}>
      <div className={styles.infoCard}>
        <IntroCard>
          <div className={styles.cta}>
            <p className={styles.ctaTitle}>{t('choose_interview_mode')}</p>
            <div className={styles.controls}>
              <ConfigProvider
                theme={{
                  token: { colorPrimary: colors.orangered, colorPrimaryHover: colors['light-orangered'] },
                }}
              >
                <Segmented<IntroMode>
                  block
                  size={'large'}
                  value={mode}
                  onChange={setMode}
                  className={styles.segmented}
                  options={[
                    { label: t('interview_by_job_desc'), value: 'job_desc' },
                    { label: t('interview_by_topic'), value: 'topic' },
                  ]}
                />
                <Link href={MODE_ROUTES[mode]} className={'block'}>
                  <Button
                    type={'primary'}
                    size={'large'}
                    block
                    className={'btn-md !h-auto whitespace-normal !px-6 !py-2 font-semibold shadow-md'}
                  >
                    {t('start_interview')}
                    <ArrowRightOutlined />
                  </Button>
                </Link>
              </ConfigProvider>
            </div>
          </div>
        </IntroCard>
      </div>

      <div className={styles.arrow}>
        <DoubleArrowButtonIcon className={styles.arrowIcon} />
      </div>
    </section>
  );
};

export default IntroSectionByJobDesc;
