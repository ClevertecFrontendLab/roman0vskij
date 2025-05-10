import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiBaseURL } from './constants/base';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: ApiBaseURL.BASE_URL }),
    endpoints: () => ({}),
});
