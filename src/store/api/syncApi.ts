import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiResponse {
  // Определите структуру ответа от API
  data: any;
}

export const syncApi = createApi({
  reducerPath: 'syncApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getSyncData: builder.query<ApiResponse, string>({
      query: (key) => `api/${key}`,
    }),
  }),
});

export const { useGetSyncDataQuery } = syncApi;
