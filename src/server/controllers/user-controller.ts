import DeletedUser from '@server/DBs/models/deletedUser';
import Interview from '@server/DBs/models/interview';
import InterviewByJobDesc from '@server/DBs/models/interviewByJobDesc';
import Transaction from '@server/DBs/models/transaction';
import User from '@server/DBs/models/user';
import { SavedUser, Transaction as TransactionType, User as UserType } from '@types';
import { TRANSACTION_MODE_STATUSES } from '@utils/constants/constants';
import dbConnect from '@utils/dbConnect';
import generateEmailHash from '@utils/helpers/generateEmailHash';

export const getUserByEmail = async (email: string): Promise<SavedUser | null> => {
  await dbConnect();

  try {
    return await User.findOne({ email });
  } catch (err: any) {
    throw new Error(`Error getting user by email: ${err.message}`);
  }
};

export const getUserById = async (id: string): Promise<SavedUser | null> => {
  await dbConnect();

  try {
    return await User.findOne({ _id: id }).exec();
  } catch (err: any) {
    throw new Error(`Error getting user by id: ${err.message}`);
  }
};

export const saveUser = async (data: UserType): Promise<SavedUser | never> => {
  await dbConnect();

  const user = new User(data);

  try {
    return await user.save();
  } catch (err: any) {
    throw new Error(`Error saving user: ${err.message}`);
  }
};

export const getDeletedUserByEmail = async (email: string) => {
  await dbConnect();

  try {
    return await DeletedUser.findOne({ email_hash: generateEmailHash(email) });
  } catch (err: any) {
    throw new Error(`Error getting deleted user by email: ${err.message}`);
  }
};

const isUsedModeTransaction = (transaction: TransactionType): boolean => {
  if (transaction.payment_system === 'Stripe') {
    return transaction.payment_status === 'succeeded';
  }

  return transaction.mode_status !== TRANSACTION_MODE_STATUSES.PAID;
};

export const deleteUserWithData = async (user_id: string): Promise<void> => {
  await dbConnect();

  try {
    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return;
    }

    const transactions = await Transaction.find({ user_id });
    const usedModes = transactions.filter(isUsedModeTransaction).map((transaction) => transaction.mode);

    await DeletedUser.updateOne(
      { email_hash: generateEmailHash(user.email) },
      { $addToSet: { used_modes: { $each: usedModes } } },
      { upsert: true }
    );

    await Promise.all([
      Interview.deleteMany({ user_id }),
      InterviewByJobDesc.deleteMany({ user_id }),
      Transaction.deleteMany({ user_id }),
    ]);

    await User.deleteOne({ _id: user_id });
  } catch (err: any) {
    throw new Error(`Error deleting user with data: ${err.message}`);
  }
};
