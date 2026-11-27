import PaymentPage from '@components/pages/PaymentPage';
import { t } from '@i18n/server';
import { authOptions } from '@server/auth';
import { getModeById } from '@server/controllers/mode-controller';
import {
  createTransaction,
  getPaidTransactionByModeId,
  getPendingTransactionByModeId,
} from '@server/controllers/transaction-controller';
import { checkPaymentLimit } from '@server/services/mode.service';
import { PROJECT_NAME } from '@utils/constants/constants';
import { DOMAIN, IS_DEMO_MODE, STRIPE_ACCOUNT_ID, STRIPE_SECRET_KEY } from '@utils/constants/environments';
import { ROUTES } from '@utils/constants/routes';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

interface PaymentProps {
  params: Promise<{ mode_id: string }>;
}

export function generateMetadata(): Metadata {
  return {
    title: `${PROJECT_NAME} | ${t('Payment')}`,
  };
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: '2023-10-16',
});

export default async function Payment({ params }: PaymentProps) {
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.user_id;

  if (!user_id) {
    redirect(ROUTES.login);
  }

  const { mode_id } = await params;
  const mode = await getModeById(mode_id);

  if (!mode) {
    redirect(ROUTES.price);
  }

  const isPaidMode = await getPaidTransactionByModeId(user_id, mode_id);

  if (isPaidMode) {
    redirect(ROUTES.price);
  }

  if (IS_DEMO_MODE) {
    const isPaymentLimit = await checkPaymentLimit({
      modeId: mode_id,
      userId: user_id,
      email: session?.user?.email,
    });

    if (isPaymentLimit) {
      redirect(ROUTES.price);
    }
  }

  let clientSecret: string | null = null;

  const pendingTransaction = await getPendingTransactionByModeId(user_id, mode_id);

  const isLocalDomain = !DOMAIN || DOMAIN.startsWith('localhost') || DOMAIN.startsWith('127.0.0.1');

  if (!isLocalDomain) {
    try {
      await stripe.paymentMethodDomains.create(
        {
          domain_name: DOMAIN,
        },
        {
          stripeAccount: STRIPE_ACCOUNT_ID,
        }
      );
    } catch (err: any) {
      console.error('Stripe payment method domain registration failed:', err.message);
    }
  }

  if (pendingTransaction) {
    clientSecret = pendingTransaction.client_secret;
  } else {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: mode.price * 100,
        currency: 'USD',
      });

      if (paymentIntent) {
        clientSecret = paymentIntent.client_secret;

        await createTransaction({
          client_secret: clientSecret as string,
          payment_amount: paymentIntent.amount / 100,
          payment_system: 'Stripe',
          payment_transaction_id: paymentIntent.id,
          payment_status: 'pending',
          mode_status: 'pending',
          user_id,
          mode: mode_id,
        });
      }
    } catch (err: any) {
      clientSecret = null;
      console.error(`Error payment preparation: ${err.message}`);
    }
  }

  return clientSecret ? <PaymentPage clientSecret={clientSecret} /> : <p>Error of payment preparation</p>;
}
