import { Route, Routes } from 'react-router';

import { CategoryPage } from '~/pages/category';
import { FiltersPage } from '~/pages/filters';
import { HomePage } from '~/pages/home';
import { JuiciestPage } from '~/pages/juiciest';
import { NotFoundPage } from '~/pages/notFound';
import { RecipePage } from '~/pages/recipe';

import { MainLayout } from '../layouts/mainLayout';
import { ProtectedRoute } from './protectedRoute';

export function Routing() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path='the-juiciest' element={<JuiciestPage />} />
                <Route path='filters' element={<FiltersPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path=':category/:subcategory/:recipe' element={<RecipePage />} />
                    <Route path=':category/:subcategory' element={<CategoryPage />} />
                </Route>
            </Route>
            <Route path='not-found' element={<NotFoundPage />} />
            {/* <Route path='*' element={<Navigate to='/not-found' replace />} /> */}
        </Routes>
    );
}
