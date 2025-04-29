import { Route, Routes } from 'react-router';

import { FiltersPage } from '~/pages/filters';
import { HomePage } from '~/pages/home';
import { JuiciestPage } from '~/pages/juiciest';
import { RecipePage } from '~/pages/recipe';
import { VeganPage } from '~/pages/vegan';

export function Routing() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path='the-juiciest' element={<JuiciestPage />} />
            <Route path='filters' element={<FiltersPage />} />
            <Route path=':category/:subcategory/:recipeId' element={<RecipePage />} />
            <Route path=':category/:subcategory' element={<VeganPage />} />
        </Routes>
    );
}
