import { Route, Routes } from 'react-router';

import { HomePage } from '~/pages/home';
import { JuiciestPage } from '~/pages/juiciest';
import { RecipePage } from '~/pages/recipe';
import { VeganPage } from '~/pages/vegan';

export function Routing() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path='juiciest' element={<JuiciestPage />} />
            <Route path=':category/:subcategory/:recipeId' element={<RecipePage />} />
            <Route path=':category/:subcategory' element={<VeganPage />} />
        </Routes>
    );
}
