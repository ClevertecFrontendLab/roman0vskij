import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { selectCategories } from '~/entities/category';
import { useAppInit } from '~/features/appInit/model/useAppInit';
import { useAppSelector } from '~/store/hooks';

export function ProtectedRoute() {
    useAppInit();
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

    // const [
    //     getRecipeQuery,
    //     {
    //         data: recipe,
    //         error: errorRecipe,
    //         isError: isErrorRecipe,
    //         isFetching: isFetchingRecipe,
    //         isSuccess: isSuccessRecipe,
    //     },
    // ] = useLazyGetRecipeQuery();

    // useEffect(() => {
    //     if (recipeID) {
    //         getRecipeQuery(recipeID);
    //     }
    // }, [recipeID]);

    // useEffect(() => {
    //     dispatch(setAppLoader(isFetchingRecipe));
    //     if (isErrorRecipe && errorRecipe) {
    //         dispatch(setAppError(`Recipe error: ${errorRecipe.toString()}`));
    //         decline(1);
    //     } else {
    //         dispatch(setAppError(null));
    //     }
    //     if (!isFetchingRecipe && isSuccessRecipe && recipe) {
    //         dispatch(setCurrentRecipe(recipe));
    //     }
    // }, [isErrorRecipe, errorRecipe, isFetchingRecipe]);

    // useEffect(() => {
    //     if (!isFetchingRecipe) {
    //         if (rest.length) decline(2);
    //         if (category && subcategory && recipeID && recipe) {
    //             const currentCategory = categories.find((c) => c.category === category);
    //             if (!currentCategory) decline(3);

    //             const currentSubcategory = currentCategory?.subCategories.find(
    //                 (s) => s.category === subcategory,
    //             );
    //             if (!currentSubcategory) decline(4);

    //             if (!recipe?.categoriesIds.includes(currentSubcategory!._id)) decline(5);
    //         } else if (category && subcategory) {
    //             const currentCategory = categories.find((c) => c.category === category);
    //             if (!currentCategory) decline(6);

    //             const currentSubcategory = currentCategory?.subCategories.find(
    //                 (s) => s.category === subcategory,
    //             );
    //             if (!currentSubcategory) decline(7);
    //         } else if (category) {
    //             const currentCategory = categories.find((c) => c.category === category);
    //             if (!currentCategory) decline(8);
    //         }
    //         setAllowed(true);
    //     }
    // }, [location.pathname, categories, recipe, isFetchingRecipe]);

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
