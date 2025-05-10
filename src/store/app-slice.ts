import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './configure-store';
export type AppState = typeof initialState;

type initialState = {
    isLoading: boolean;
    isPageLoading: boolean;
    error: {
        error: string;
        message: string;
        statusCode: number;
    } | null;
};

const initialState: initialState = {
    isLoading: false,
    isPageLoading: false,
    error: null,
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<string | null>) {
            state.error = error ? { error: error, message: '', statusCode: 0 } : null;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setPageLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isPageLoading = isLoading;
        },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;
export const pageLoadingSelector = (state: ApplicationState) => state.app.isPageLoading;

export const { setAppError, setAppLoader, setPageLoader } = appSlice.actions;
export default appSlice.reducer;
