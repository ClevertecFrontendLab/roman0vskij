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
import { setAppError, setAppLoader, setPageLoader } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export const useAppInit = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const {
        data: dataCategories,
        error: errorCategories,
        isSuccess: isSuccessCategories,
        isError: isErrorCategories,
        isFetching: isFetchingCategories,
        isLoading: isLoadingCategories,
        refetch: refetchCategories,
    } = useGetCategoriesQuery();

    useEffect(() => {
        if (isSuccessCategories && dataCategories) {
            dispatch(setCategories(dataCategories));
            return;
        }
    }, [dataCategories, isSuccessCategories]);

    const {
        data: juiciestRecipes,
        isSuccess: isSuccessJuiciest,
        isFetching: isFetchingJuiciest,
        isLoading: isLoadingJuiciest,
        isError: isErrorJuiciest,
        error: errorJuiciest,
        refetch: refetchJuiciest,
    } = useGetRecipesQuery({ limit: 8, sortOrder: 'DESC', page: 1, sortBy: 'likes' });

    useEffect(() => {
        if (isSuccessJuiciest && juiciestRecipes) {
            dispatch(setJuiciestRecipes(juiciestRecipes.data));
            return;
        }
    }, [isSuccessJuiciest, juiciestRecipes]);

    useEffect(() => {
        refetchCategories();
        refetchJuiciest();
    }, [location.pathname]);

    //*-------------------
    //TODO всё, что ниже, сделать отдельным хуком или чем-то таким
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
            isFetching: isFetchingRandomRecipes,
            isSuccess: isSuccessRandomRecipes,
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
            return;
        }
    }, [randomRecipesData, isSuccessRandomRecipes]);

    useEffect(() => {
        if (isLoadingCategories || isLoadingJuiciest) {
            dispatch(setAppLoader(true));
            dispatch(setPageLoader(false));
        } else {
            dispatch(setAppLoader(false));
        }
    }, [isLoadingCategories, isLoadingJuiciest]);

    useEffect(() => {
        if (isErrorRandomRecipes) {
            dispatch(setAppError(`Init error: ${errorRandomRecipes.toString()}`));
            return;
        }
        if (isErrorJuiciest) {
            dispatch(setAppError(`Init error: ${errorJuiciest.toString()}`));
            return;
        }
        if (isErrorCategories) {
            dispatch(setAppError(`Init error: ${errorCategories.toString()}`));
            return;
        }
        if (!isErrorRandomRecipes && !isErrorJuiciest && !isErrorCategories) {
            dispatch(setAppError(null));
        }
    }, [isErrorRandomRecipes, isErrorJuiciest, isErrorCategories]);

    useEffect(() => {
        if (!isLoadingCategories && !isLoadingJuiciest) {
            if (isFetchingCategories || isFetchingJuiciest || isFetchingRandomRecipes) {
                dispatch(setPageLoader(true));
            } else {
                dispatch(setPageLoader(false));
            }
        }
    }, [isFetchingCategories, isFetchingJuiciest, isFetchingRandomRecipes]);
    //*-------------------
};
