import api from '@store/api/api';
import { Recommendation } from '@store/api/models/Recommendation.types';

export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecommendation: builder.query<string, Recommendation>({
      query(data) {
        return {
          method: 'POST',
          url: `/recommendation`,
          body: data,
        };
      },

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Error of getting recommendation', error);
        }
      },
    }),
  }),
});

export const { useGetRecommendationQuery, useLazyGetRecommendationQuery } = extendedApiSlice;
