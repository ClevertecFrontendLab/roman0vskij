import { ApplicationState } from '~/store/configure-store';

export const selectCategories = (state: ApplicationState) => state.categories.categories;
export const selectRandomCategory = (state: ApplicationState) => state.categories.randomCategory;
