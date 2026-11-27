import api from '@store/api/api';

export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteAccount: builder.mutation<void, void>({
      query() {
        return {
          method: 'DELETE',
          url: '/account',
        };
      },
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Error of deleting account', error);
        }
      },
    }),
  }),
});

export const { useDeleteAccountMutation } = extendedApiSlice;
