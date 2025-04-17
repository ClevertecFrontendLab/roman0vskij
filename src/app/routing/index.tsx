import { Route, Routes } from 'react-router';

import { JuiciestPage } from '~/pages/juiciest';
import { MainPage } from '~/pages/main';
import { VeganPage } from '~/pages/vegan';

export function Routing() {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/juiciest' element={<JuiciestPage />} />
            <Route path='*' element={<VeganPage />} />
        </Routes>
    );
}
