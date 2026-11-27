import { QuestionCircleOutlined } from '@ant-design/icons';
import Chat from '@components/Chat';
import { StrictInterviewDescription } from '@components/ModeFeatureList/ModeFeatureList';
import { Modal, Switch } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './interviewModeToggle.module.scss';

const InterviewModeToggle = (props: any) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.root}>
        <button
          type={'button'}
          className={styles.btn}
          onClick={showModal}
          aria-label={'Show Interview mode description'}
        >
          <QuestionCircleOutlined className={styles.questionMark} />
          Interview mode
        </button>
        <Switch aria-label={'Activate Interview mode'} defaultChecked={false} {...props} />
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} centered={true}>
        <Chat>
          <>
            <StrictInterviewDescription />
            <p>{t('strict_interview_mode_additional_desc')}</p>
          </>
        </Chat>
      </Modal>
    </>
  );
};

export default InterviewModeToggle;
