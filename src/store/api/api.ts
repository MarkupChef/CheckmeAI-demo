import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set('accept', `application/json`);
      headers.set('contentType', `application/json`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
