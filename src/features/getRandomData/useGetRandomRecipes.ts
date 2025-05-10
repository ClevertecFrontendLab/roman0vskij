import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';

import { selectCategories, setRandomCategory } from '~/entities/category';
import { useGetRecipesBySubcategoryQuery } from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export function useGetRandomRecipes() {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const location = useLocation();
    const currentCategory = useMemo(() => location.pathname.split('/').pop(), [location.pathname]);
    const randomCategory = useMemo(() => {
        if (categories.length === 0) return;

        if (currentCategory === '')
            return categories[Math.floor(Math.random() * categories.length)];

        const filtered = categories.filter((c) => c.category !== currentCategory);

        return filtered[Math.floor(Math.random() * filtered.length)];
    }, [categories, currentCategory]);

    useEffect(() => {
        if (randomCategory) {
            dispatch(setRandomCategory(randomCategory));
        }
    }, [randomCategory]);

    const {
        data: randomRecipesData,
        isFetching: isFetchingRandomRecipes,
        isSuccess: isSuccessRandomRecipes,
        isError: isErrorRandomRecipes,
        error: errorRandomRecipes,
    } = useGetRecipesBySubcategoryQuery(
        randomCategory
            ? randomCategory.subCategories[
                  Math.floor(Math.random() * randomCategory.subCategories.length)
              ]._id
            : skipToken,
    );

    return {
        randomRecipesData,
        isFetchingRandomRecipes,
        isSuccessRandomRecipes,
        isErrorRandomRecipes,
        errorRandomRecipes,
    };
}
