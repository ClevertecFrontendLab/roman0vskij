import { TRecipe } from '~/entities/recipe';
import { useAppSelector } from '~/store/hooks';

import { selectSelectedAllergens } from './selectors';

export function useFilterByAllergens() {
    const allergens = useAppSelector(selectSelectedAllergens);

    return function filterByAllergens(data: TRecipe[]) {
        return data.filter(
            (recipe) =>
                !recipe.ingredients.find((ingred) =>
                    allergens.find((a) => ingred.title.toLowerCase().includes(a.toLowerCase())),
                ),
        );
    };
}
