import { ApplicationState } from '~/store/configure-store';

export const selectIsAuthorized = (state: ApplicationState) => state.auth.isAuthorized;
