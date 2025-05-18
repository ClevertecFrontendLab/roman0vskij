import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import {
    selectCategories,
    selectRandomCategory,
    setCategories,
    setRandomCategory,
    TCategory,
} from '~/entities/category';
import { setJuiciestRecipes, setRandomRecipes } from '~/entities/recipe';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipesQuery, useLazyGetRecipesBySubcategoryQuery } from '~/query/services/recipes';
import { setAppError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export const useAppInit = (handleInitialLaunch: () => void) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const {
        data: dataCategories,
        isSuccess: isSuccessCategories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        error: errorCategories,
    } = useGetCategoriesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    useEffect(() => {
        if (isSuccessCategories && dataCategories) {
            dispatch(setCategories(dataCategories));
        }
    }, [dataCategories, isSuccessCategories]);

    const {
        data: juiciestRecipes,
        isSuccess: isSuccessJuiciest,
        isLoading: isLoadingJuiciest,
        isError: isErrorJuiciest,
        error: errorJuiciest,
    } = useGetRecipesQuery(
        { limit: 8, sortOrder: 'DESC', page: 1, sortBy: 'likes' },
        { pollingInterval: 60000, refetchOnFocus: true, refetchOnReconnect: true },
    );

    useEffect(() => {
        if (isSuccessJuiciest && juiciestRecipes) {
            dispatch(setJuiciestRecipes(juiciestRecipes.data));
        }
    }, [isSuccessJuiciest, juiciestRecipes]);

    const randomCategory = useAppSelector(selectRandomCategory) as TCategory;
    const categories = useAppSelector(selectCategories);
    const [currentCategory, setCurrentCategory] = useState('/');

    useEffect(() => {
        if (categories.length) {
            const [_, category] = location.pathname.split('/');
            if (currentCategory !== category) {
                if (currentCategory === '') {
                    const randomCateg = categories[Math.floor(Math.random() * categories.length)];
                    if (randomCateg?._id !== randomCategory?._id) {
                        dispatch(setRandomCategory(randomCateg));
                    }
                    setCurrentCategory(category);
                    return;
                }

                const filtered = categories.filter((c) => c.category !== currentCategory);
                const randomCateg = filtered[Math.floor(Math.random() * filtered.length)];
                if (randomCateg?._id !== randomCategory?._id) {
                    dispatch(setRandomCategory(randomCateg));
                    setCurrentCategory(category);
                }
            }
        }
    }, [categories, location.pathname]);

    const [
        getRecipesBySubcategory,
        {
            data: randomRecipesData,
            isSuccess: isSuccessRandomRecipes,
            isLoading: isLoadingRandomRecipes,
            isFetching: isFetchingRandomRecipes,
            isError: isErrorRandomRecipes,
            error: errorRandomRecipes,
        },
    ] = useLazyGetRecipesBySubcategoryQuery();

    useEffect(() => {
        if (randomCategory) {
            getRecipesBySubcategory({
                subcategoryId:
                    randomCategory.subCategories[
                        Math.floor(Math.random() * randomCategory.subCategories.length)
                    ]._id,
                params: {
                    limit: 5,
                },
            });
        }
    }, [randomCategory]);

    useEffect(() => {
        if (randomRecipesData?.data && isSuccessRandomRecipes) {
            dispatch(setRandomRecipes(randomRecipesData.data));
        }
    }, [randomRecipesData, isSuccessRandomRecipes]);

    useEffect(() => {
        if (
            isLoadingCategories ||
            isLoadingJuiciest ||
            isLoadingRandomRecipes ||
            isFetchingRandomRecipes
        ) {
            dispatch(setAppLoader(true));
        } else if (isSuccessRandomRecipes && !isFetchingRandomRecipes) {
            dispatch(setAppLoader(false));
        }
    }, [isLoadingCategories, isLoadingJuiciest, isLoadingRandomRecipes, isFetchingRandomRecipes]);

    useEffect(() => {
        if (isErrorRandomRecipes) {
            dispatch(setAppError(errorRandomRecipes));
            return;
        }
        if (isErrorJuiciest) {
            dispatch(setAppError(errorJuiciest));
            return;
        }
        if (isErrorCategories) {
            dispatch(setAppError(errorCategories));
            return;
        }
    }, [isErrorRandomRecipes, isErrorJuiciest, isErrorCategories]);

    useEffect(() => {
        if (isSuccessCategories && isSuccessJuiciest && isSuccessRandomRecipes) {
            handleInitialLaunch();
            dispatch(setAppLoader(false));
        }
    }, [isSuccessCategories, isSuccessJuiciest, isSuccessRandomRecipes]);
};
