import { Navigate, Route, Routes } from 'react-router';

import { CategoryPage } from '~/pages/category';
import { FiltersPage } from '~/pages/filters';
import { HomePage } from '~/pages/home';
import { JuiciestPage } from '~/pages/juiciest';
import { NotFoundPage } from '~/pages/notFound';
import { RecipePage } from '~/pages/recipe';

export function Routing() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path='the-juiciest' element={<JuiciestPage />} />
            <Route path='filters' element={<FiltersPage />} />
            <Route path=':category/:subcategory/:recipeId' element={<RecipePage />} />
            <Route path=':category/:subcategory' element={<CategoryPage />} />
            <Route path='not-found' element={<NotFoundPage />} />
            <Route path='*' element={<Navigate to='/not-found' replace />} />
        </Routes>
    );
}
