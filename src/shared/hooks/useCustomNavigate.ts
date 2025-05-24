import { useNavigate } from 'react-router';

import { setRecipes } from '~/entities/recipe';
import { useAppDispatch } from '~/store/hooks';
import { setSearchQuery, setSelectedAllergens } from '~/widgets/drawer';

export function useCustomNavigate() {
    const dispatch = useAppDispatch();
    const navig = useNavigate();

    return function navigate(path: string) {
        dispatch(setSearchQuery(''));
        dispatch(setSelectedAllergens([]));
        dispatch(setRecipes([]));

        navig(path);
    };
}
