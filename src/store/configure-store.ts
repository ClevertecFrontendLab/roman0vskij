import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { filterReducer, filterSlice } from '~/features/filter';
import { apiSlice } from '~/query/create-api';

import appReducer, { appSlice } from './app-slice';
const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [filterSlice.name]: filterReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
