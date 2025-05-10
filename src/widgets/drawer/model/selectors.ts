import { ApplicationState } from '~/store/configure-store';

export const selectData = (state: ApplicationState) => state.drawer.data;
export const selectSelectedCategories = (state: ApplicationState) =>
    state.drawer.selectedCategories;
export const selectSelectedAuthors = (state: ApplicationState) => state.drawer.selectedAuthors;
export const selectSelectedMeat = (state: ApplicationState) => state.drawer.selectedMeat;
export const selectSelectedSide = (state: ApplicationState) => state.drawer.selectedSide;
export const selectSelectedAllergens = (state: ApplicationState) => state.drawer.selectedAllergens;
export const selectSearchQuery = (state: ApplicationState) => state.drawer.searchQuery;
