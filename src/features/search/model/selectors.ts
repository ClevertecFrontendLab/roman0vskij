import { ApplicationState } from '~/store/configure-store';

export const selectSearchQuery = (state: ApplicationState) => state.search.searchQuery;
