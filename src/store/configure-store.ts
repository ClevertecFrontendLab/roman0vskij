import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { filterReducer, filterSlice } from '~/features/filter';
import { searchReducer, searchSlice } from '~/features/search';
import { apiSlice } from '~/query/create-api';
import { drawerReducer, drawerSlice } from '~/widgets/drawer';

import appReducer, { appSlice } from './app-slice';
const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [filterSlice.name]: filterReducer,
    [searchSlice.name]: searchReducer,
    [drawerSlice.name]: drawerReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
