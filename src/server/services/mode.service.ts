import { getModeById } from '@server/controllers/mode-controller';
import { getPaidTransactionByModeId, getSucceededStripeTransaction } from '@server/controllers/transaction-controller';
import { getDeletedUserByEmail } from '@server/controllers/user-controller';

export async function checkAvailableMode({ modeId, userId }: { modeId: string; userId: string }): Promise<{
  slug: string;
  isAvailable: boolean;
}> {
  const mode = await getModeById(modeId);

  if (!mode || !mode?.slug) {
    throw new Error('Mode not found');
  }

  const transaction = await getPaidTransactionByModeId(userId, modeId);

  return {
    slug: mode?.slug,
    isAvailable: !!transaction,
  };
}

// demo mode: only one Stripe payment per account, also before account deletion
export async function checkPaymentLimit({
  modeId,
  userId,
  email,
}: {
  modeId: string;
  userId: string;
  email?: string | null;
}): Promise<boolean> {
  const transaction = await getSucceededStripeTransaction(userId);

  if (transaction) {
    return true;
  }

  if (!email) {
    return false;
  }

  const deletedUser = await getDeletedUserByEmail(email);

  return !!deletedUser?.used_modes.some((mode: any) => mode.equals(modeId));
}
