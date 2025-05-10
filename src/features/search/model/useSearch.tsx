import { useEffect } from 'react';

import { selectCategories } from '~/entities/category';
import { setRecipes } from '~/entities/recipe';
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
import { setAppError } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectSelectedCategories } from '~/widgets/drawer';

import { Search } from '../ui/search';
import SearchLoader from '../ui/searchLoader';
import { setIsFetching, setSearchQuery } from './slice';

export function useSearch() {
    const dispatch = useAppDispatch();

    const [_, category] = location.pathname.split('/');
    const categories = useAppSelector(selectCategories);
    const currentCategory = categories.find((c) => c.category === category);
    const selectedCategories = useAppSelector(selectSelectedCategories);

    const [
        getRecipesQuery,
        {
            data: dataRecipes,
            error: errorRecipes,
            isSuccess: isSuccessRecipes,
            isError: isErrorRecipes,
            isFetching: isFetchingRecipes,
        },
    ] = useLazyGetRecipesQuery();

    useEffect(() => {
        if (isFetchingRecipes) {
            dispatch(setIsFetching(true));
            return;
        } else {
            dispatch(setIsFetching(false));
        }
        if (!isFetchingRecipes && isSuccessRecipes && dataRecipes) {
            dispatch(setRecipes(dataRecipes.data));
        }
        if (isErrorRecipes && errorRecipes) {
            dispatch(setAppError(`Search error: ${errorRecipes.toString()}`));
        } else {
            dispatch(setAppError(null));
        }
    }, [dataRecipes, isSuccessRecipes, isErrorRecipes, errorRecipes, isFetchingRecipes]);

    function handleOnclick(value: string) {
        dispatch(setSearchQuery(value));

        getRecipesQuery({
            searchString: value,
            subcategoriesIds:
                (currentCategory?.subCategories.map((s) => s._id).join(',') ??
                    selectedCategories.join(',')) ||
                undefined,
        });
    }

    const SearchInput = () =>
        isFetchingRecipes ? <SearchLoader /> : <Search onclick={handleOnclick} />;

    return SearchInput;
}
