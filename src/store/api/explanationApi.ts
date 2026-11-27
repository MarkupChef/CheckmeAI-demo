import api from '@store/api/api';
import { ExplanationByJobDesc } from '@store/api/models/ExplanationByJobDesc.types';

export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getExplanationByJobDesc: builder.query<string, ExplanationByJobDesc>({
      query(data) {
        return {
          method: 'POST',
          url: `/explanationAnswer`,
          body: data,
        };
      },

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Error of getting explanation by Job desc', error);
        }
      },
    }),
  }),
});

export const { useLazyGetExplanationByJobDescQuery } = extendedApiSlice;
