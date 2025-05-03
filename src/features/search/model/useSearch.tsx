import { TMock } from '~/shared/types';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { Search } from '../ui/search';
import { setSearchQuery } from './searchSlice';
import { selectSearchQuery } from './selectors';

export function useSearch() {
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector(selectSearchQuery);

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
