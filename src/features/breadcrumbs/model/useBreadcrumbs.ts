import { useLocation } from 'react-router';

import { mockCategories } from '~/shared/mock/mockCategories';
import { mockData } from '~/shared/mock/mockData';

export function useBreadcrumbs() {
    const location = useLocation();
    const [_, category, subcategory, recipeId] = location.pathname.split('/');
    const categoryName =
        category === 'the-juiciest'
            ? 'Самое сочное'
            : category === 'filters'
              ? 'Фильтры'
              : mockCategories.find((categ) => categ.id === category)?.name;
    const firstSubcategory = mockCategories.find((categ) => categ.id === category)?.subCategories[0]
        .id;
    const subCategoryName = mockCategories
        .find((categ) => categ.id === category)
        ?.subCategories.find((subCateg) => subCateg.id === subcategory)?.name;
    const recipe = mockData.find((r) => r.id === recipeId);

    return {
        categoryName,
        subCategoryName,
        recipe,
        category,
        subcategory,
        firstSubcategory,
    };
}
