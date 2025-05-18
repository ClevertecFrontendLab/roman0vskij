import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categoriesReducer, categoriesSlice } from '~/entities/category';
import { recipesReducer, recipesSlice } from '~/entities/recipe';
import { apiSlice } from '~/query/create-api';
import { drawerReducer, drawerSlice } from '~/widgets/drawer';

import appReducer, { appSlice } from './app-slice';
const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [drawerSlice.name]: drawerReducer,
    [categoriesSlice.name]: categoriesReducer,
    [recipesSlice.name]: recipesReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
