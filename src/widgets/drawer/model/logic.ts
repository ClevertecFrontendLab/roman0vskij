import { useEffect, useState } from 'react';

import { selectCategories } from '~/entities/category';
import { setRecipes } from '~/entities/recipe';
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
import { setAppError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import {
    selectSelectedAllergens,
    selectSelectedAuthors,
    selectSelectedCategories,
    selectSelectedMeat,
    selectSelectedSide,
} from './selectors';
import {
    setSelectedAllergens,
    setSelectedAuthors,
    setSelectedCategories,
    setSelectedMeat,
    setSelectedSide,
} from './slice';
import { FilterTag, GROUP } from './types';

type TProps = {
    inputRef: React.RefObject<HTMLInputElement | null>;
    onClose: () => void;
};

export function DrawerLogic({ inputRef, onClose }: TProps) {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const selectedCategories = useAppSelector(selectSelectedCategories);
    const selectedAuthors = useAppSelector(selectSelectedAuthors);
    const selectedMeat = useAppSelector(selectSelectedMeat);
    const selectedSide = useAppSelector(selectSelectedSide);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);

    function deleteTag(tag: FilterTag) {
        switch (tag.group) {
            case GROUP.CATEGORIES:
                dispatch(
                    setSelectedCategories(selectedCategories.filter((item) => item !== tag.label)),
                );
                break;
            case GROUP.AUTHORS:
                dispatch(setSelectedAuthors(selectedAuthors.filter((item) => item !== tag.label)));
                break;
            case GROUP.MEAT:
                dispatch(setSelectedMeat(selectedMeat.filter((item) => item !== tag.label)));
                break;
            case GROUP.SIDE:
                dispatch(setSelectedSide(selectedSide.filter((item) => item !== tag.label)));
                break;
            case GROUP.ALLERGENS:
                dispatch(
                    setSelectedAllergens(selectedAllergens.filter((item) => item !== tag.label)),
                );
                break;
            default:
                break;
        }
    }

    function handleClear() {
        dispatch(setSelectedCategories([]));
        dispatch(setSelectedAuthors([]));
        dispatch(setSelectedAllergens([]));
        dispatch(setSelectedMeat([]));
        dispatch(setSelectedSide([]));
    }

    function toggleIsActive() {
        setIsActive((prev) => !prev);
        dispatch(setSelectedAllergens([]));
    }

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
        dispatch(setAppLoader(isFetchingRecipes));

        if (!isFetchingRecipes && isSuccessRecipes && dataRecipes) {
            dispatch(setRecipes(dataRecipes.data));
            handleClear();
            return;
        }
        if (isErrorRecipes && errorRecipes) {
            dispatch(setAppError(errorRecipes));
        }
    }, [dataRecipes, isSuccessRecipes, isErrorRecipes, errorRecipes, isFetchingRecipes]);

    const [isActive, setIsActive] = useState(selectedAllergens.length > 0);

    function addAllergen() {
        if (inputRef.current && inputRef.current.value.length > 0) {
            dispatch(
                setSelectedAllergens([...selectedAllergens, inputRef.current?.value as string]),
            );
            inputRef.current.value = '';
            setIsActive(true);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addAllergen();
        }
    };

    function handleOnchange(values: Array<string | number>) {
        if (values.length === 0) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
        dispatch(setSelectedAllergens(values as string[]));
    }

    const [isActiveCategories, setIsActiveCategories] = useState(selectedCategories.length > 0);

    function handleOnchangeCategories(values: Array<string | number>) {
        if (values.length === 0) {
            setIsActiveCategories(false);
        } else {
            setIsActiveCategories(true);
        }
        dispatch(setSelectedCategories(values as string[]));
    }

    const [isActiveAuthors, setIsActiveAuthors] = useState(selectedAuthors.length > 0);

    function handleOnchangeAuthors(values: Array<string | number>) {
        if (values.length === 0) {
            setIsActiveAuthors(false);
        } else {
            setIsActiveAuthors(true);
        }
        dispatch(setSelectedAuthors(values as string[]));
    }

    function handleOnchangeSide(values: Array<string | number>) {
        dispatch(setSelectedSide(values as string[]));
    }

    function handleOnchangeMeat(values: Array<string | number>) {
        dispatch(setSelectedMeat(values as string[]));
    }

    const allSelectedFilters: FilterTag[] = [
        ...selectedCategories.map((label) => ({ label, group: GROUP.CATEGORIES })),
        ...selectedAuthors.map((label) => ({ label, group: GROUP.AUTHORS })),
        ...selectedMeat.map((label) => ({ label, group: GROUP.MEAT })),
        ...selectedSide.map((label) => ({ label, group: GROUP.SIDE })),
        ...selectedAllergens.map((label) => ({ label, group: GROUP.ALLERGENS })),
    ];

    function handleFindRecipe() {
        getRecipesQuery({
            subcategoriesIds: selectedCategories.length
                ? categories
                      .filter((c) => selectedCategories.find((s) => s === c.title))
                      .map((c) => c._id)
                      .join(',')
                : undefined,
            allergens: selectedAllergens.length ? selectedAllergens.join(',') : undefined,
            garnish: selectedSide.length ? selectedSide.join(',') : undefined,
            meat: selectedMeat.length ? selectedMeat.join(',') : undefined,
        });
        onClose();
    }

    return {
        deleteTag,
        handleClear,
        toggleIsActive,
        handleFindRecipe,
        allSelectedFilters,
        allergens: {
            isActive,
            addAllergen,
            handleKeyDown,
            handleOnchange,
            selectedValues: selectedAllergens,
        },
        categories: {
            isActive: isActiveCategories,
            handleOnchange: handleOnchangeCategories,
            selectedValues: selectedCategories,
        },
        authors: {
            isActive: isActiveAuthors,
            handleOnchange: handleOnchangeAuthors,
            selectedValues: selectedAuthors,
        },
        side: { handleOnchange: handleOnchangeSide, selectedValues: selectedSide },
        meat: { handleOnchange: handleOnchangeMeat, selectedValues: selectedMeat },
    };
}
