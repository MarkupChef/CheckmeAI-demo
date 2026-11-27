import { withAuth } from 'next-auth/middleware';

export default withAuth({});

export const config = {
  matcher: [
    '/interview',
    '/interviews',
    '/interviews/:id*',
    '/profile',
    '/interview-preparation',
    '/successful-payment',
    '/job-vacancy',
  ],
};
