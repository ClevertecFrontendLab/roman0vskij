import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCredentials, signOut } from '~/features/auth';

import { ApiEndpoints } from './constants/api';
import { ApiBaseURL } from './constants/base';

const baseQuery = fetchBaseQuery({
    baseUrl: ApiBaseURL.BASE_URL,
    credentials: 'include',
    prepareHeaders(headers) {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    const token = localStorage.getItem('token');
    let result = await baseQuery(args, api, extraOptions);

    if (result.meta?.response?.headers) {
        const responseHeaders = result.meta?.response?.headers;
        const accessToken = responseHeaders?.get('authentication-access');

        if (accessToken) {
            api.dispatch(setCredentials(accessToken));
        }
    }

    if (token && result?.error?.status === 403) {
        const refreshResult = await baseQuery(ApiEndpoints.AUTH_REFRESH, api, extraOptions);

        if (refreshResult?.data) {
            api.dispatch(setCredentials(refreshResult.data.toString()));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(signOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
