import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = {
    selectedCategories: string[];
    selectedAuthors: string[];
    selectedMeat: string[];
    selectedSide: string[];
    selectedAllergens: string[];
};

const initialState: initialState = {
    selectedCategories: [],
    selectedAuthors: [],
    selectedMeat: [],
    selectedSide: [],
    selectedAllergens: [],
};

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
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
    },
});

export const {
    setSelectedCategories,
    setSelectedAuthors,
    setSelectedMeat,
    setSelectedSide,
    setSelectedAllergens,
} = drawerSlice.actions;
export default drawerSlice.reducer;
