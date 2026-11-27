import api from '@store/api/api';

export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getModes: builder.query({
      query() {
        return {
          url: `/modes`,
        };
      },

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Error of getting modes', error);
        }
      },
    }),
  }),
});

export const { useGetModesQuery } = extendedApiSlice;
