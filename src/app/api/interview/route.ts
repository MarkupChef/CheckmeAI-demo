import { t } from '@i18n/server';
import { authOptions } from '@server/auth';
import { getModeById } from '@server/controllers/mode-controller';
import { getPaidTransactionByModeId, updateTransactionModeStatus } from '@server/controllers/transaction-controller';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.user_id;

  if (!user_id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { mode_id } = await request.json();

    if (!mode_id) {
      return NextResponse.json({ message: 'Missing mode id parameter from request body' }, { status: 400 });
    }

    const mode = await getModeById(mode_id);

    if (!mode || !mode?.slug) {
      return NextResponse.json({ message: 'Mode not found' }, { status: 400 });
    }

    const isPaidMode = await getPaidTransactionByModeId(user_id, mode_id);

    if (!isPaidMode) {
      return NextResponse.json({ message: `${t(mode.slug)} mode is not available` }, { status: 400 });
    }

    const status = await updateTransactionModeStatus(user_id, mode_id, 'started');

    return NextResponse.json({ data: { status } });
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
