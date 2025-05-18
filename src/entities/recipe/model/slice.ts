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
        setRecipes: (state, { payload }: PayloadAction<TRecipe[]>) => {
            state.recipes = payload;
        },
        setRandomRecipes: (state, { payload }: PayloadAction<TRecipe[]>) => {
            state.randomRecipes = payload;
        },
        setJuiciestRecipes: (state, { payload }: PayloadAction<TRecipe[]>) => {
            state.juiciestRecipes = payload;
        },
        setCurrentRecipe: (state, { payload }: PayloadAction<TRecipe | null>) => {
            state.currentRecipe = payload;
        },
    },
});

export const { setRecipes, setRandomRecipes, setJuiciestRecipes, setCurrentRecipe } =
    recipesSlice.actions;
export default recipesSlice.reducer;
