import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TRecipe } from './types';

type initialState = {
    recipes: TRecipe[];
    randomRecipes: TRecipe[];
    juiciestRecipes: TRecipe[];
    currentRecipe: TRecipe | null;
};

const initialState: initialState = {
    recipes: [],
    randomRecipes: [],
    juiciestRecipes: [],
    currentRecipe: null,
};

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state, action: PayloadAction<TRecipe[]>) => {
            state.recipes = action.payload;
        },
        setRandomRecipes: (state, action: PayloadAction<TRecipe[]>) => {
            state.randomRecipes = action.payload;
        },
        setJuiciestRecipes: (state, action: PayloadAction<TRecipe[]>) => {
            state.juiciestRecipes = action.payload;
        },
        setCurrentRecipe: (state, action: PayloadAction<TRecipe | null>) => {
            state.currentRecipe = action.payload;
        },
    },
});

export const { setRecipes, setRandomRecipes, setJuiciestRecipes, setCurrentRecipe } =
    recipesSlice.actions;
export default recipesSlice.reducer;
