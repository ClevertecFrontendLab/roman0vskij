import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TCategory } from './types';

type initialState = {
    categories: TCategory[];
    randomCategory: TCategory | null;
};

const initialState: initialState = {
    categories: [],
    randomCategory: null,
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, { payload }: PayloadAction<TCategory[]>) => {
            state.categories = payload;
        },
        setRandomCategory: (state, { payload }: PayloadAction<TCategory>) => {
            state.randomCategory = payload;
        },
    },
});

export const { setCategories, setRandomCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
