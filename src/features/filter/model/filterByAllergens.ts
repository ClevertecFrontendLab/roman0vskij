import { useSelector } from 'react-redux';

import { TMock } from '~/shared/types';

import { selectSelectedAllergens } from './selectors';

export function useFilterByAllergens() {
    const allergens = useSelector(selectSelectedAllergens);

    return function filterByAllergens(data: TMock[]) {
        return data.filter(
            (recipe) =>
                !recipe.ingredients.find((ingred) =>
                    allergens.find((a) => ingred.title.toLowerCase().includes(a.toLowerCase())),
                ),
        );
    };
}
