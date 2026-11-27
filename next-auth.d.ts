import 'next-auth';

declare module 'next-auth' {
  interface User {
    email: string;
    name: string;
    image: string;
    is_new_user?: boolean;
  }

  interface Session {
    user: {
      email: string;
      name: string;
      image: string | null;
      user_id?: string | null;
      is_new_user?: boolean;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    email: string;
    name: string;
    image: string;
    user_id?: string | null;
    is_new_user?: boolean;
  }
}
