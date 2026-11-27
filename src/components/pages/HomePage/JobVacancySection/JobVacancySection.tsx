import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Chat from '@components/Chat';
import { PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import { Button, Card, ConfigProvider, Typography } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import colors from '../../../../../colors';
import styles from './JobVacancySection.module.scss';

const REQUIREMENTS = [
  'JobVacancySection.example.requirement_1',
  'JobVacancySection.example.requirement_2',
  'JobVacancySection.example.requirement_3',
];

const OPTIONS = [
  'JobVacancySection.example.option_1',
  'JobVacancySection.example.option_2',
  'JobVacancySection.example.option_3',
  'JobVacancySection.example.option_4',
];

const LETTERS = ['A', 'B', 'C', 'D'];

const JobVacancySection = () => {
  const { t } = useTranslation();

  const renderVacancyCard = () => (
    <Card className={styles.vacancyCard}>
      <div className={styles.vacancyHeader}>
        <div>
          <Typography.Text type={'secondary'}>{t('JobVacancySection.position')}</Typography.Text>
          <h5 className={styles.vacancyTitle}>{t('JobVacancySection.example.job_title')}</h5>
        </div>
        <div>
          <Typography.Text type={'secondary'}>{t('JobVacancySection.company')}</Typography.Text>
          <h5 className={styles.vacancyTitle}>{t('JobVacancySection.example.company_name')}</h5>
        </div>
      </div>

      <Typography.Text type={'secondary'}>{t('JobVacancySection.requirements')}</Typography.Text>
      <ul className={styles.requirements}>
        {REQUIREMENTS.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
    </Card>
  );

  const renderQuestionCard = () => (
    <Card className={styles.questionCard}>
      <Chat>
        <p className={styles.counter}>{t('JobVacancySection.example.question_counter', { current: 1, total: 50 })}</p>
        <p className={styles.question}>{t('JobVacancySection.example.question')}</p>
        <div className={styles.options}>
          {OPTIONS.map((key, i) => (
            <div key={key} className={`${styles.option} ${i === 0 ? styles.optionChecked : ''}`}>
              <span>{LETTERS[i]}</span>
              <span>{t(key)}</span>
            </div>
          ))}
        </div>
      </Chat>
    </Card>
  );

  return (
    <section className={styles.root}>
      <div className={`container ${styles.content}`}>
        <div className={styles.text}>
          <h2 className={styles.title}>
            {t('JobVacancySection.title')}
            <br />
            <span className={styles.titleAccent}>{t('JobVacancySection.title_accent')}</span>
          </h2>
          <p className={styles.description}>{t('JobVacancySection.description', { projectName: PROJECT_NAME })}</p>
        </div>

        <div className={styles.preview} aria-hidden={true}>
          {renderVacancyCard()}
          <div className={styles.previewArrow}>
            <ArrowDownOutlined />
          </div>
          {renderQuestionCard()}
        </div>

        <div className={styles.action}>
          <ConfigProvider
            theme={{
              token: { colorPrimary: colors.orangered, colorPrimaryHover: colors['light-orangered'] },
            }}
          >
            <Link href={ROUTES.job_vacancy} className={'inline-block'}>
              <Button
                type={'primary'}
                size={'large'}
                className={'btn-md !h-auto whitespace-normal !px-8 !py-3 font-semibold shadow-md'}
              >
                {t('JobVacancySection.button')}
                <ArrowRightOutlined />
              </Button>
            </Link>
          </ConfigProvider>
        </div>
      </div>
    </section>
  );
};

export default JobVacancySection;
