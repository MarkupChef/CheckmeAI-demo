import 'next-auth';

declare module 'next-auth' {
  interface User {
    email: string;
    name: string;
    image: string;
  }

  interface Session {
    user: {
      email: string;
      name: string;
      image: string | null;
      user_id?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    email: string;
    name: string;
    image: string;
    user_id?: string | null;
  }
}
