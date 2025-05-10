import { useNavigate } from 'react-router';

import { setSelectedAllergens } from '~/features/filter';
import { setSearchQuery } from '~/features/search/model/slice';
import { useAppDispatch } from '~/store/hooks';

export function useCustomNavigate() {
    const dispatch = useAppDispatch();
    const navig = useNavigate();

    return function navigate(path: string) {
        dispatch(setSearchQuery(''));
        dispatch(setSelectedAllergens([]));

        navig(path);
    };
}
