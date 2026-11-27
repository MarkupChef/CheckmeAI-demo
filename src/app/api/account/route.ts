import { authOptions } from '@server/auth';
import { deleteUserWithData } from '@server/controllers/user-controller';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.user_id;

  if (!user_id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await deleteUserWithData(user_id);

    return NextResponse.json({ message: 'Account deleted' });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
