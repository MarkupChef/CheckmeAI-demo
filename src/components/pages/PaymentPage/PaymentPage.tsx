'use client';

import PaymentForm from '@components/PaymentForm/PaymentForm';
import H1 from '@components/UI/H1';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, loadStripe } from '@stripe/stripe-js';
import { IS_DEMO_MODE } from '@utils/constants/environments';
import { Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../../../colors';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentPageProps {
  clientSecret: string;
}

const PaymentPage: FC<PaymentPageProps> = ({ clientSecret }) => {
  const { t } = useTranslation();

  const appearance: Appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: colors['seagreen-500'],
    },
  };

  return (
    <div className={'mx-auto w-full max-w-6xl text-center'}>
      <H1>{t('Choose payment method')}</H1>

      {IS_DEMO_MODE && (
        <Typography.Paragraph type={'secondary'} className={'mb-6'}>
          {t('test_card_hint')}
        </Typography.Paragraph>
      )}

      <Elements stripe={stripePromise} options={{ clientSecret, appearance, loader: 'always' }}>
        <div className={'mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-10'}>
          <PaymentForm />
        </div>
      </Elements>
    </div>
  );
};

export default PaymentPage;
