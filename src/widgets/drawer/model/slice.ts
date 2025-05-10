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
        setData: (state, action: PayloadAction<TRecipe[]>) => {
            state.data = action.payload;
        },
        setSelectedCategories: (state, action: PayloadAction<string[]>) => {
            state.selectedCategories = action.payload;
        },
        setSelectedAuthors: (state, action: PayloadAction<string[]>) => {
            state.selectedAuthors = action.payload;
        },
        setSelectedMeat: (state, action: PayloadAction<string[]>) => {
            state.selectedMeat = action.payload;
        },
        setSelectedSide: (state, action: PayloadAction<string[]>) => {
            state.selectedSide = action.payload;
        },
        setSelectedAllergens: (state, action: PayloadAction<string[]>) => {
            state.selectedAllergens = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
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
