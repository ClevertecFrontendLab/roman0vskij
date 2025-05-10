import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = {
    searchQuery: string;
    isFetching: boolean;
};

const initialState: initialState = {
    searchQuery: '',
    isFetching: false,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },
    },
});

export const { setSearchQuery, setIsFetching } = searchSlice.actions;
export default searchSlice.reducer;
