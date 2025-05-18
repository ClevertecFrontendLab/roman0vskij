import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TRecipe } from '~/entities/recipe';

type initialState = {
    data: TRecipe[];
    selectedCategories: string[];
    selectedAuthors: string[];
    selectedMeat: string[];
    selectedSide: string[];
    selectedAllergens: string[];
    searchQuery: string;
};

const initialState: initialState = {
    data: [],
    selectedCategories: [],
    selectedAuthors: [],
    selectedMeat: [],
    selectedSide: [],
    selectedAllergens: [],
    searchQuery: '',
};

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        setData: (state, { payload }: PayloadAction<TRecipe[]>) => {
            state.data = payload;
        },
        setSelectedCategories: (state, { payload }: PayloadAction<string[]>) => {
            state.selectedCategories = payload;
        },
        setSelectedAuthors: (state, { payload }: PayloadAction<string[]>) => {
            state.selectedAuthors = payload;
        },
        setSelectedMeat: (state, { payload }: PayloadAction<string[]>) => {
            state.selectedMeat = payload;
        },
        setSelectedSide: (state, { payload }: PayloadAction<string[]>) => {
            state.selectedSide = payload;
        },
        setSelectedAllergens: (state, { payload }: PayloadAction<string[]>) => {
            state.selectedAllergens = payload;
        },
        setSearchQuery: (state, { payload }: PayloadAction<string>) => {
            state.searchQuery = payload;
        },
    },
});

export const {
    setData,
    setSelectedCategories,
    setSelectedAuthors,
    setSelectedMeat,
    setSelectedSide,
    setSelectedAllergens,
    setSearchQuery,
} = drawerSlice.actions;
export default drawerSlice.reducer;
