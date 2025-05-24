import { FieldValues } from 'react-hook-form';

import { apiSlice } from '~/query/create-api.ts';

import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-names';
import { EndpointNames } from '../constants/endpoint-names';

type TSignIn = {
    login: string;
    password: string;
};

type TSignUp = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
};

type TResponse = {
    statusText: string;
    message: string;
};

export const authApiSlice = apiSlice.enhanceEndpoints({}).injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<TResponse, TSignIn>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_SIGN_IN,
                method: 'POST',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.SIGN_IN,
                body,
            }),
        }),
        signUp: builder.mutation<TResponse, TSignUp>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_SIGN_UP,
                method: 'POST',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.SIGN_UP,
                body,
            }),
        }),
        checkToken: builder.query<void, void>({
            query: () => ({
                url: ApiEndpoints.AUTH_CHECK,
                method: 'GET',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.CHECK_TOKEN,
            }),
        }),
        forgotPassword: builder.mutation<TResponse, FieldValues>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_FORGOT_PASSWORD,
                method: 'POST',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.FORGOT_PASSWORD,
                body,
            }),
        }),
        verifyOTP: builder.mutation<
            TResponse,
            {
                email: string;
                otpToken: string;
            }
        >({
            query: (body) => ({
                url: ApiEndpoints.AUTH_VERIFY_OTP,
                method: 'POST',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.FORGOT_PASSWORD,
                body,
            }),
        }),
        resetPassword: builder.mutation<TResponse, FieldValues>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_RESET_PASSWORD,
                method: 'POST',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.RESET_PASSWORD,
                body,
            }),
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useCheckTokenQuery,
    useForgotPasswordMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation,
} = authApiSlice;
