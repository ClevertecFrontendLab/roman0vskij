import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { MainLayout } from '../layouts/mainLayout';
import { ProtectedRoute } from './protectedRoute';

const HomePage = lazy(() =>
    import('~/pages/home').then((module) => ({ default: module.HomePage })),
);
const JuiciestPage = lazy(() =>
    import('~/pages/juiciest').then((module) => ({ default: module.JuiciestPage })),
);
const FiltersPage = lazy(() =>
    import('~/pages/filters').then((module) => ({ default: module.FiltersPage })),
);
const RecipePage = lazy(() =>
    import('~/pages/recipe').then((module) => ({ default: module.RecipePage })),
);
const CategoryPage = lazy(() =>
    import('~/pages/category').then((module) => ({ default: module.CategoryPage })),
);
const NotFoundPage = lazy(() =>
    import('~/pages/notFound').then((module) => ({ default: module.NotFoundPage })),
);

export function Routing() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route
                    index
                    element={
                        <Suspense>
                            <HomePage />
                        </Suspense>
                    }
                />
                <Route
                    path='the-juiciest'
                    element={
                        <Suspense>
                            <JuiciestPage />
                        </Suspense>
                    }
                />
                <Route
                    path='filters'
                    element={
                        <Suspense>
                            <FiltersPage />
                        </Suspense>
                    }
                />
                <Route element={<ProtectedRoute />}>
                    <Route
                        path=':category/:subcategory/:recipe'
                        element={
                            <Suspense>
                                <RecipePage />
                            </Suspense>
                        }
                    />
                    <Route
                        path=':category/:subcategory'
                        element={
                            <Suspense>
                                <CategoryPage />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
            <Route
                path='not-found'
                element={
                    <Suspense>
                        <NotFoundPage />
                    </Suspense>
                }
            />
            {/* <Route path='*' element={<Navigate to='/not-found' replace />} /> */}
        </Routes>
    );
}
