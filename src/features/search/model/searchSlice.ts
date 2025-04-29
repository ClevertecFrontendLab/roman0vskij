import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = {
    searchQuery: string;
};

const initialState: initialState = {
    searchQuery: '',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
