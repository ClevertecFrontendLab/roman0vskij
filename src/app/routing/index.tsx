import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { Verification } from '~/pages/verification';
import { Loader } from '~/shared/ui/loader';

import { MainLayout, RequireAuth } from '../layouts';
//import { ProtectedRoute } from './protectedRoute';

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
const SignIn = lazy(() =>
    import('~/pages/signIn/index').then((module) => ({ default: module.SignIn })),
);
const SignUp = lazy(() =>
    import('~/pages/signUp/index').then((module) => ({ default: module.SignUp })),
);

export function Routing() {
    return (
        <Routes>
            //http://localhost:3000/verification?emailVerified=false
            <Route path='verification' element={<Verification />} />
            <Route
                path='sign-in'
                element={
                    <Suspense fallback={<Loader />}>
                        <SignIn />
                    </Suspense>
                }
            />
            <Route
                path='sign-up'
                element={
                    <Suspense fallback={<Loader />}>
                        <SignUp />
                    </Suspense>
                }
            />
            <Route element={<RequireAuth />}>
                <Route element={<MainLayout />}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<Loader />}>
                                <HomePage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='the-juiciest'
                        element={
                            <Suspense fallback={<Loader />}>
                                <JuiciestPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='filters'
                        element={
                            <Suspense fallback={<Loader />}>
                                <FiltersPage />
                            </Suspense>
                        }
                    />
                    {/* <Route element={<ProtectedRoute />}> */}
                    <Route
                        path=':category/:subcategory/:recipe'
                        element={
                            <Suspense fallback={<Loader />}>
                                <RecipePage />
                            </Suspense>
                        }
                    />
                    <Route
                        path=':category/:subcategory'
                        element={
                            <Suspense fallback={<Loader />}>
                                <CategoryPage />
                            </Suspense>
                        }
                    />
                    {/* </Route> */}
                </Route>
            </Route>
            <Route
                path='not-found'
                element={
                    <Suspense fallback={<Loader />}>
                        <NotFoundPage />
                    </Suspense>
                }
            />
            <Route path='*' element={<Navigate to='/not-found' replace />} />
        </Routes>
    );
}
