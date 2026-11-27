'use client';

import H1 from '@components/UI/H1';
import { ROUTES } from '@utils/constants/routes';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const SuccessfulPaymentPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={'mx-auto w-full max-w-6xl text-center'}>
      <H1>{t('Payment_was_successful')}</H1>

      <Link href={ROUTES.job_vacancy}>
        <Button color={'primary'} className={'mx-auto rounded-full'}>
          {t('continue')}
        </Button>
      </Link>
    </div>
  );
};

export default SuccessfulPaymentPage;
