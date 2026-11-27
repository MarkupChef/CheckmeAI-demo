import { getMode } from '@server/controllers/mode-controller';
import { createTransaction } from '@server/controllers/transaction-controller';
import { getDeletedUserByEmail, getUserByEmail, saveUser } from '@server/controllers/user-controller';
import { ERROR_LOGIN_PROVIDER_MISMATCH_KEY, FREE_MODE_SLUG } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

// Проверка наличия переменных окружения
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is not defined');
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_SECRET is not defined');
}
if (!process.env.GITHUB_ID) {
  throw new Error('GITHUB_ID is not defined');
}
if (!process.env.GITHUB_SECRET) {
  throw new Error('GITHUB_SECRET is not defined');
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: ROUTES.login,
    signOut: ROUTES.root,
    error: '/',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
          response_type: 'code',
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (user.email && user.name && account?.provider) {
        let currentUser = await getUserByEmail(user.email);

        if (currentUser && currentUser.auth !== account.provider) {
          return `${ROUTES.login}?error=${ERROR_LOGIN_PROVIDER_MISMATCH_KEY}`;
        }

        // register new user
        if (!currentUser) {
          currentUser = await saveUser({
            name: user.name,
            email: user.email,
            auth: account.provider,
          });

          const freeMode = await getMode({ slug: FREE_MODE_SLUG });
          const deletedUser = await getDeletedUserByEmail(user.email);
          const isFreeModeUsed = deletedUser?.used_modes.some((mode: any) => mode.equals(freeMode?._id));

          if (freeMode && !isFreeModeUsed) {
            await createTransaction({
              user_id: currentUser.id,
              client_secret: '-',
              payment_transaction_id: '-',
              payment_system: '-',
              payment_status: 'succeeded',
              payment_amount: 0,
              mode: freeMode._id,
              mode_status: 'paid',
            });
          }

          user.is_new_user = true;
        }

        return true;
      }

      return false;
    },

    async jwt({ token, user, account }) {
      if (user && user.email) {
        const userFromDB = await getUserByEmail(user.email);

        if (user.is_new_user) {
          token.is_new_user = true;
        }

        token.user_id = userFromDB?.id || null;
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      const { user_id } = session.user;

      if (token.is_new_user) {
        session.user.is_new_user = true;
      }

      // undefined can't be serialized in server-rendered props if user has no avatar
      session.user.image = session.user.image || null;

      if (!user_id && token.email) {
        const user = await getUserByEmail(token.email);
        session.user.user_id = user?.id || null;
      }

      return session;
    },
  },
};
