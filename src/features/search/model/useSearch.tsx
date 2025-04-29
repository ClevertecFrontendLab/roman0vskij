import { useDispatch, useSelector } from 'react-redux';

import { TMock } from '~/shared/types';

import { Search } from '../ui/search';
import { setSearchQuery } from './searchSlice';
import { selectSearchQuery } from './selectors';

export function useSearch() {
    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);

    function changeSearchQuery(value: string) {
        if (value.trim().length === 0) dispatch(setSearchQuery(''));
        dispatch(setSearchQuery(value));
    }

    function filterBySearchQuery(data: TMock[]) {
        return data.filter((elem) => elem.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const SearchInput = () => <Search onclick={changeSearchQuery} />;

    return { SearchInput, filterBySearchQuery };
}
