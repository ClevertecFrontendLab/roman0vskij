import { TMock } from '~/shared/types';
import { useAppSelector } from '~/store/hooks';

import { selectSelectedAllergens } from './selectors';

export function useFilterByAllergens() {
    const allergens = useAppSelector(selectSelectedAllergens);

    return function filterByAllergens(data: TMock[]) {
        return data.filter(
            (recipe) =>
                !recipe.ingredients.find((ingred) =>
                    allergens.find((a) => ingred.title.toLowerCase().includes(a.toLowerCase())),
                ),
        );
    };
}
