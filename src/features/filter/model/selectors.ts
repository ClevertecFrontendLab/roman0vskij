import { ApplicationState } from '~/store/configure-store';

export const selectSelectedAllergens = (state: ApplicationState) => state.filter.selectedAllergens;
