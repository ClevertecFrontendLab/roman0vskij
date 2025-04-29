import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = {
    selectedAllergens: string[];
};

const initialState: initialState = {
    selectedAllergens: [],
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSelectedAllergens: (state, action: PayloadAction<string[]>) => {
            state.selectedAllergens = action.payload;
        },
    },
});

export const { setSelectedAllergens } = filterSlice.actions;
export default filterSlice.reducer;
