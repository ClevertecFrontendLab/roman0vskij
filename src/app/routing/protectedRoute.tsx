import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { selectCategories } from '~/entities/category';
import { useAppSelector } from '~/store/hooks';

export function ProtectedRoute() {
    const [isAllowed, setAllowed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const categories = useAppSelector(selectCategories);
    const [_, category, subcategory] = location.pathname.split('/');

    function decline(i: number) {
        console.log(i);
        setAllowed(false);
        navigate('not-found', { replace: true });
    }

    useEffect(() => {
        if (category && subcategory) {
            const currentCategory = categories.find((c) => c.category === category);
            if (!currentCategory) decline(6);

            const currentSubcategory = currentCategory?.subCategories.find(
                (s) => s.category === subcategory,
            );
            if (!currentSubcategory) decline(7);
        } else if (category) {
            const currentCategory = categories.find((c) => c.category === category);
            if (!currentCategory) decline(8);
        }
        setAllowed(true);
    }, [location.pathname, categories]);

    return isAllowed && <Outlet />;
}
