import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { setSelectedAllergens } from '~/features/filter';
import { setSearchQuery } from '~/features/search/model/searchSlice';

export function useCustomNavigate() {
    const dispatch = useDispatch();
    const navig = useNavigate();

    return function navigate(path: string) {
        dispatch(setSearchQuery(''));
        dispatch(setSelectedAllergens([]));

        navig(path);
    };
}
