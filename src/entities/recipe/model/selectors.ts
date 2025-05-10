import { ApplicationState } from '~/store/configure-store';

export const selectRecipes = (state: ApplicationState) => state.recipes.recipes;
export const selectRandomRecipes = (state: ApplicationState) => state.recipes.randomRecipes;
export const selectJuiciestRecipes = (state: ApplicationState) => state.recipes.juiciestRecipes;
export const selectCurrentRecipe = (state: ApplicationState) => state.recipes.currentRecipe;
