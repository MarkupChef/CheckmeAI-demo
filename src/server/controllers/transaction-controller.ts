import Transaction from '@server/DBs/models/transaction';
import { ModeStatus, Transaction as TransactionType } from '@types';
import { TRANSACTION_MODE_STATUSES } from '@utils/constants/constants';
import dbConnect from '@utils/dbConnect';

interface SaveTransaction extends TransactionType {
  user_id: string;
}

export const createTransaction = async (data: SaveTransaction): Promise<any | never> => {
  await dbConnect();

  const transaction = new Transaction(data);

  try {
    return await transaction.save();
  } catch (err: any) {
    throw new Error(`Error creation transaction: ${err.message}`);
  }
};

export const getTransactionByModeId = async (
  user_id: string,
  mode_id: string,
  filter: {}
): Promise<TransactionType | null> => {
  await dbConnect();

  try {
    return await Transaction.findOne({ user_id, mode: mode_id, ...filter });
  } catch (err: any) {
    return null;
  }
};

export const updateTransactionModeStatus = async (
  user_id: string,
  mode_id: string,
  status: ModeStatus
): Promise<any | never> => {
  await dbConnect();

  const filter = {
    user_id,
    mode: mode_id,
    mode_status: TRANSACTION_MODE_STATUSES.PAID,
  };

  try {
    // finish all started modes
    await Transaction.updateMany(
      { user_id, mode_status: TRANSACTION_MODE_STATUSES.IN_PROGRESS },
      { mode_status: TRANSACTION_MODE_STATUSES.FINISHED }
    );

    // update current mode status
    const transaction = await Transaction.findOneAndUpdate(filter, { mode_status: status }, { new: true });

    return transaction.mode_status;
  } catch (err: any) {
    throw new Error(`Error update status mode in transactions: ${err.message}`);
  }
};

export const getPaidTransactionByModeId = async (user_id: string, mode_id: string): Promise<TransactionType | null> => {
  await dbConnect();

  try {
    return await Transaction.findOne({ user_id, mode: mode_id, mode_status: TRANSACTION_MODE_STATUSES.PAID });
  } catch (err: any) {
    return null;
  }
};

export const getPendingTransactionByModeId = async (
  user_id: string,
  mode_id: string
): Promise<TransactionType | null> => {
  await dbConnect();

  try {
    return await Transaction.findOne({ user_id, mode: mode_id, mode_status: 'pending' });
  } catch (err: any) {
    return null;
  }
};

export const getSucceededStripeTransaction = async (user_id: string): Promise<TransactionType | null> => {
  await dbConnect();

  try {
    return await Transaction.findOne({ user_id, payment_system: 'Stripe', payment_status: 'succeeded' });
  } catch (err: any) {
    throw new Error(`Error getting succeeded Stripe transaction: ${err.message}`);
  }
};

interface updateTransactionPaymentStatusProps {
  client_secret: string;
  payment_transaction_id: string;
  status: string;
  user_id: string;
}

export const updateTransactionPaymentStatus = async ({
  client_secret,
  payment_transaction_id,
  status,
  user_id,
}: updateTransactionPaymentStatusProps): Promise<any | never> => {
  await dbConnect();

  const filter = {
    client_secret,
    payment_transaction_id,
    mode_status: 'pending',
    user_id,
  };

  try {
    const result = await Transaction.findOneAndUpdate(
      filter,
      { payment_status: status, mode_status: TRANSACTION_MODE_STATUSES.PAID },
      { new: true }
    );

    return result?.mode;
  } catch (err: any) {
    throw new Error(`Error update status transaction: ${err.message}`);
  }
};

export const getTransactionWithStartedMode = async (user_id: string): Promise<any> => {
  await dbConnect();

  try {
    return await Transaction.findOne({ user_id, mode_status: TRANSACTION_MODE_STATUSES.STARTED })
      .populate('mode')
      .exec();
  } catch (err: any) {
    return undefined;
  }
};

interface UpdateTransactionProps {
  filter: {};
  update: {};
}

export const updateTransaction = async ({ filter, update }: UpdateTransactionProps): Promise<any | never> => {
  await dbConnect();

  try {
    return await Transaction.findOneAndUpdate(filter, update, { new: true });
  } catch (err: any) {
    throw new Error(`Error update transaction: ${err.message}`);
  }
};

export const getTransaction = async (filter: {}): Promise<TransactionType | null> => {
  await dbConnect();

  try {
    return await Transaction.findOne(filter).populate('mode').lean<TransactionType>().exec();
  } catch (err: any) {
    throw new Error(`Error get transactions: ${err.message}`);
  }
};
