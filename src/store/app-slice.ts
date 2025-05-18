import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './configure-store';
export type AppState = typeof initialState;

export type TError = {
    error: string;
    message: string;
    statusCode: number;
};

type initialState = {
    isLoading: boolean;
    error: TError | null;
};

const initialState: initialState = {
    isLoading: false,
    error: null,
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload }) {
            state.error = payload;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;

export const { setAppError, setAppLoader } = appSlice.actions;
export default appSlice.reducer;
