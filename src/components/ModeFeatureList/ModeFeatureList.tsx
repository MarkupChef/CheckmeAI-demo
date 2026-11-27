import { QuestionCircleOutlined } from '@ant-design/icons';
import Chat from '@components/Chat';
import CAICheckCircleIcon from '@components/Icons/CAICheckCircleIcon';
import { Mode } from '@types';
import { INTERVIEW_MODE_SLUG, INTERVIEW_TIMER_DURATION, TEST_PASS_PERCENTAGE } from '@utils/constants/constants';
import { Modal } from 'antd';
import { FC, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './modeFeatureList.module.scss';

interface Feature {
  id: string;
  isAvailable: boolean;
  title: string;
  iconClassName: string;
  description: ReactNode;
}

export const StrictInterviewDescription = () => (
  <>
    <p>Activating this mode will allow you to truly test your knowledge:</p>
    <ul>
      <li>You will have {INTERVIEW_TIMER_DURATION / 60} minutes to answer the question</li>
      <li>The ability to select text and inspect the page is disabled.</li>
      <li>Switching between questions is impossible</li>
    </ul>
  </>
);

const ModeFeatureList: FC<{ mode: Mode }> = ({ mode }) => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>('');

  const getIconClassName = (isGold: boolean) => (isGold ? styles.iconGold : styles.icon);

  const features: Feature[] = [
    {
      id: 'is_explanation',
      isAvailable: mode.is_explanation,
      title: t('answer_explanation'),
      iconClassName: styles.icon,
      description: t('explanation_feature_description'),
    },
    {
      id: 'is_practical_application',
      isAvailable: mode.is_practical_application,
      title: t('practical_application'),
      iconClassName: styles.icon,
      description: t('practical_application_feature_description'),
    },
    {
      id: 'is_strict_mode',
      isAvailable: true,
      title: t('strict_interview_mode'),
      iconClassName: styles.icon,
      description: <StrictInterviewDescription />,
    },
    {
      id: 'is_recommendation',
      isAvailable: mode.is_recommendation,
      title: t('ai_recommendation'),
      iconClassName: getIconClassName(true),
      description: t('recommendation_feature_description'),
    },
    {
      id: 'is_certificate',
      isAvailable: mode.is_certificate,
      title: t('ai_certificate'),
      iconClassName: getIconClassName(mode.slug === INTERVIEW_MODE_SLUG),
      description: t('certificate_feature_description', { percentage: TEST_PASS_PERCENTAGE }),
    },
    {
      id: 'is_public_access_result',
      isAvailable: mode.is_certificate,
      title: t('public_access_result'),
      iconClassName: getIconClassName(mode.slug === INTERVIEW_MODE_SLUG),
      description: t('public_result_feature_description'),
    },
  ];

  const showModal = (id: string) => {
    setIsModalOpen(true);
    const description = features.find((feature) => feature.id === id)?.description;
    setModalContent(description || '');
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ul className={styles.root}>
        {features.map(({ id, isAvailable, title, iconClassName }, i) => {
          if (!isAvailable) {
            return null;
          }

          return (
            <li key={i} className={styles.item} onClick={() => showModal(id)}>
              <CAICheckCircleIcon className={iconClassName} />
              {title}
              <sup>
                <QuestionCircleOutlined className={styles.questionMark} />
              </sup>
            </li>
          );
        })}

        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} centered={true}>
          <Chat>{modalContent}</Chat>
        </Modal>
      </ul>
    </>
  );
};

export default ModeFeatureList;
