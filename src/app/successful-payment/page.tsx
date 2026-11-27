import SuccessfulPaymentPage from '@components/pages/SuccessfulPaymentPage';
import { t } from '@i18n/server';
import { authOptions } from '@server/auth';
import { getModeById } from '@server/controllers/mode-controller';
import { updateTransactionPaymentStatus } from '@server/controllers/transaction-controller';
import { PROJECT_NAME } from '@utils/constants/constants';
import { STRIPE_SECRET_KEY } from '@utils/constants/environments';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

interface SuccessfulPaymentProps {
  searchParams: Promise<{
    payment_intent?: string;
    payment_intent_client_secret?: string;
    redirect_status?: string;
  }>;
}

export function generateMetadata(): Metadata {
  return {
    title: `${PROJECT_NAME} | ${t('Successful_payment')}`,
  };
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: '2023-10-16',
});

export default async function SuccessfulPayment({ searchParams }: SuccessfulPaymentProps) {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.user_id as string;
  const { payment_intent, payment_intent_client_secret, redirect_status } = await searchParams;

  if (!payment_intent || !payment_intent_client_secret || !redirect_status) {
    redirect(ROUTES.root);
  }

  let mode_slug: string | undefined;

  try {
    // check real payment status, query params can be faked
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    if (paymentIntent.status === 'succeeded' && paymentIntent.client_secret === payment_intent_client_secret) {
      const modeId = await updateTransactionPaymentStatus({
        client_secret: payment_intent_client_secret,
        payment_transaction_id: payment_intent,
        status: paymentIntent.status,
        user_id,
      });

      if (modeId) {
        const mode = await getModeById(modeId);
        mode_slug = mode?.slug;
      }
    }
  } catch (err: any) {
    console.error('Error of updateTransactionPaymentStatus: ', err.message);
  }

  if (!mode_slug) {
    redirect(ROUTES.root);
  }

  return <SuccessfulPaymentPage />;
}
