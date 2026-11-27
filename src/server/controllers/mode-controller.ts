import Mode from '@server/DBs/models/mode';
import Transaction from '@server/DBs/models/transaction';
import InterviewModeType from '@store/api/models/InterviewMode.type';
import ModeType from '@store/api/models/Mode.type';
import { Question } from '@store/api/models/Questions.type';
import { GOOGLE_SHEETS_FREE_MODE_QUESTIONS } from '@utils/constants/constants';
import dbConnect from '@utils/dbConnect';
import { getShuffledOptions } from '@utils/getShuffledOptions';
import doc from '@utils/helpers/connectToGoogleSheets';
import encryptNumber from '@utils/helpers/encryptNumber';
import getSecretKeyByDate from '@utils/helpers/getSecretKeyByDate';

export const getModeById = async (id: string): Promise<InterviewModeType | null> => {
  await dbConnect();

  try {
    return (await Mode.findOne({ _id: id })) || null;
  } catch (err: any) {
    throw new Error(`Error getting mode: ${err.message}`);
  }
};

export const getModes = async (user_id?: string): Promise<any | never> => {
  await dbConnect();

  try {
    const [modes, transactions] = await Promise.all([
      Mode.find({ isEnable: true }),
      user_id ? Transaction.find({ user_id }).sort({ createdAt: -1 }) : [],
    ]);

    // get all transaction with status paid
    const transactionMap = new Map<string, any>();

    transactions.forEach((transaction) => {
      if (transaction.mode_status === 'paid') {
        transactionMap.set(transaction.mode._id.toString(), transaction);
      }
    });

    const availableModes = await Promise.all(
      modes.map(async (mode) => {
        const isAvailable = transactionMap.has(mode._id.toString());

        return {
          ...mode._doc,
          available: isAvailable,
        };
      })
    );

    return availableModes;
  } catch (err: any) {
    throw new Error(`Error getting modes: ${err.message}`);
  }
};

export const getStartedModeId = async (user_id: string): Promise<string | undefined> => {
  await dbConnect();

  try {
    const mode = await Transaction.findOne({ user_id, mode_status: 'started' });

    return mode.mode_id;
  } catch (err: any) {
    return undefined;
  }
};

export const getMode = async (filter: any): Promise<ModeType | null> => {
  await dbConnect();

  try {
    return await Mode.findOne(filter);
  } catch (err: any) {
    throw new Error(`Error getting mode: ${err.message}`);
  }
};

export const getFreeModeQuestions = async ({
  slug,
  level,
}: {
  slug: string;
  level: string;
}): Promise<Question[] | null> => {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[GOOGLE_SHEETS_FREE_MODE_QUESTIONS];
    const rows = await sheet.getRows();

    const questions = rows
      .filter((row) => row.get('slug') === slug && row.get('level') === level)
      .map((row, i) => {
        const date = Date.now().toString();
        const secretKey = getSecretKeyByDate(date);

        const answers = [row.get('opt1'), row.get('opt2'), row.get('opt3'), row.get('opt4')];

        const answerIndex = Math.floor(Math.random() * 4);
        const shuffledOptions = getShuffledOptions(answerIndex, answers);

        return {
          id: i,
          expression: row.get('question'),
          date,
          answerIndex: encryptNumber(answerIndex, secretKey),
          answerUserIndex: -1,
          options: shuffledOptions,
          answerTime: 0,
          explanation: null,
          practicalApplication: null,
        };
      });

    return questions || null;
  } catch (err: any) {
    throw new Error(`Server error getting freeMode questions: ${err.message}`);
  }
};
