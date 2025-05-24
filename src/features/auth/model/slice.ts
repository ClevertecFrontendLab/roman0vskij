import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = {
    isAuthorized: boolean;
};

const initialState: initialState = {
    isAuthorized: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }: PayloadAction<string>) => {
            state.isAuthorized = true;
            localStorage.setItem('token', payload);
        },
        signOut: (state) => {
            state.isAuthorized = false;
            localStorage.setItem('token', '');
        },
    },
});

export const { setCredentials, signOut } = authSlice.actions;
export default authSlice.reducer;
