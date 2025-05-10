import { useLocation } from 'react-router';

import { selectCategories } from '~/entities/category';
import { selectCurrentRecipe } from '~/entities/recipe';
import { useAppSelector } from '~/store/hooks';

export function useBreadcrumbs() {
    const categories = useAppSelector(selectCategories);
    const currentRecipe = useAppSelector(selectCurrentRecipe);
    const location = useLocation();
    const [_, category, subcategory, recipeId] = location.pathname.split('/');
    const categoryName =
        category === 'the-juiciest'
            ? 'Самое сочное'
            : category === 'filters'
              ? 'Фильтры'
              : categories.find((categ) => categ.category === category)?.title;
    const firstSubcategory = categories.find((categ) => categ.category === category)
        ?.subCategories[0].category;
    const subCategoryName = categories
        .find((categ) => categ.category === category)
        ?.subCategories.find((subCateg) => subCateg.category === subcategory)?.title;

    return {
        categoryName,
        subCategoryName,
        recipe: recipeId ? currentRecipe : null,
        category,
        subcategory,
        firstSubcategory,
    };
}
