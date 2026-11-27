'use client';

import H1 from '@components/UI/H1';
import { Mode } from '@types';
import { MAX_JOB_COMPANY_NAME_CHAR, MAX_JOB_REQUIREMENTS_CHAR, MAX_JOB_TITLE_CHAR } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import { Button, Flex, Form, FormInstance, Input, Select, Skeleton, Typography } from 'antd';
import { Card } from 'flowbite-react';
import Link from 'next/link';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useJobVacancyPage, { JobDescriptionFormType } from './useJobVacancyPage';

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButton: FC<PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" size={'large'} htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

const JobVacancyPage = () => {
  const { t } = useTranslation();
  const {
    modes,
    isLoadingModes,
    isErrorModes,
    errorModesMessage,
    onFinish,
    onFinishFailed,
    form,
    onCountCharacter,
    jobReqCounter,
  } = useJobVacancyPage();

  const renderModeSelect = (modes: Mode[]) => {
    const availableModeList = modes.filter((mode) => mode.available);

    if (!availableModeList.length) {
      return (
        <Typography.Text>
          No modes available. <Link href={ROUTES.price}>Buy</Link>
        </Typography.Text>
      );
    }

    return (
      <Form.Item
        layout={'horizontal'}
        name="modeId"
        label="Mode"
        rules={[{ required: true, message: 'Please select mode!' }]}
        className={'mb-0'}
      >
        <Select placeholder="Select mode">
          {availableModeList.map((mode) => (
            <Select.Option key={mode._id} value={mode._id} disabled={!mode.available}>
              {t(mode.slug)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  };

  return (
    <div className={'mx-auto w-full max-w-6xl text-center'}>
      <H1>Job Vacancy</H1>
      <Card className={'mx-auto max-w-2xl'}>
        <Form
          form={form}
          size={'large'}
          name={'jobDescriptionForm'}
          style={{ maxWidth: 600, textAlign: 'left' }}
          layout={'vertical'}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<JobDescriptionFormType>
            rules={[
              {
                required: true,
                message: `Job Title must be at least 5 characters and no more than ${MAX_JOB_TITLE_CHAR} characters!`,
                min: 5,
                max: MAX_JOB_TITLE_CHAR,
              },
            ]}
            label="Job Title"
            name={'jobTitle'}
          >
            <Input placeholder="Junior QA Engineer" />
          </Form.Item>
          <Form.Item<JobDescriptionFormType>
            rules={[
              {
                required: true,
                message: `Company Name must be at least 3 characters and no more than ${MAX_JOB_COMPANY_NAME_CHAR} characters!`,
                min: 3,
                max: MAX_JOB_COMPANY_NAME_CHAR,
              },
            ]}
            name={'companyName'}
            label="Company Name"
          >
            <Input placeholder={'PayPal'} />
          </Form.Item>
          <Form.Item<JobDescriptionFormType>
            name={['jobDesc']}
            label={`Job Requirements (${jobReqCounter})`}
            extra="Paste the key technical requirements from the job posting here."
            rules={[
              {
                required: true,
                message: `Job Requirements must be at least 10 characters and no more than ${MAX_JOB_REQUIREMENTS_CHAR} characters!`,
                min: 10,
                max: MAX_JOB_REQUIREMENTS_CHAR,
              },
            ]}
          >
            <Input.TextArea rows={12} maxLength={MAX_JOB_REQUIREMENTS_CHAR} onChange={(e) => onCountCharacter(e)} />
          </Form.Item>

          {/* Mode select */}
          <Flex gap={'middle'} justify={'space-between'} align={'center'} wrap={true} className={'mt-4'}>
            {isLoadingModes ? (
              <Skeleton.Input active={true} />
            ) : isErrorModes ? (
              <Typography.Text type={'danger'}>{errorModesMessage}</Typography.Text>
            ) : modes ? (
              renderModeSelect(modes)
            ) : null}

            <SubmitButton form={form}>Next</SubmitButton>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};

export default JobVacancyPage;
