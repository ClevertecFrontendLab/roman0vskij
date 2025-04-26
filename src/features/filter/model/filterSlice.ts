import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
    selectedAllergens: string[];
};

const initialState: FilterState = {
    selectedAllergens: [],
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSelectedAllergens: (state, action: PayloadAction<string[]>) => {
            state.selectedAllergens = action.payload;
        },
        resetSelectedAllergens: (state) => {
            state.selectedAllergens = [];
        },
    },
});

export const { setSelectedAllergens, resetSelectedAllergens } = filterSlice.actions;
export default filterSlice.reducer;
