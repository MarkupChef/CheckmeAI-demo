import api from '@store/api/api';
import { PracticalApplicationByJobDesc } from '@store/api/models/PracticalApplication.types';

export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPracticalApplicationByJobDesc: builder.query<string, PracticalApplicationByJobDesc>({
      query({ interviewId, indexQuestion }) {
        return {
          method: 'POST',
          url: `/practicalApplicationByJobDesc`,
          body: {
            interviewId,
            indexQuestion,
          },
        };
      },

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Error of getting practical application by job desc', error);
        }
      },
    }),
  }),
});

export const { useLazyGetPracticalApplicationByJobDescQuery } = extendedApiSlice;
