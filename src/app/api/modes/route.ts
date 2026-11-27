import { authOptions } from '@server/auth';
import { getModes } from '@server/controllers/mode-controller';
import { checkPaymentLimit } from '@server/services/mode.service';
import { Mode } from '@types';
import { FREE_MODE_SLUG } from '@utils/constants/constants';
import { IS_DEMO_MODE } from '@utils/constants/environments';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.user_id || undefined;

  try {
    const modes = await getModes(user_id);

    if (IS_DEMO_MODE && user_id) {
      const modesWithLimit: Mode[] = [];

      for (const mode of modes) {
        let is_used = false;

        if (mode.slug !== FREE_MODE_SLUG && !mode.available) {
          is_used = await checkPaymentLimit({ modeId: mode._id, userId: user_id, email: session?.user?.email });
        }

        modesWithLimit.push({ ...mode, is_used });
      }

      return NextResponse.json(modesWithLimit);
    }

    return NextResponse.json(modes);
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
