import { Heading, HStack, Show, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { selectCategories } from '~/entities/category';
import { setRecipes } from '~/entities/recipe';
import { Filter } from '~/features/filter';
import { Search, SearchLoader } from '~/features/search';
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
import { PageTitle } from '~/shared/ui/pageTitle';
import { setAppError } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    Drawer,
    selectSelectedAllergens,
    selectSelectedCategories,
    selectSelectedMeat,
    selectSelectedSide,
    setSearchQuery,
    setSelectedAllergens,
} from '~/widgets/drawer';

type TProps = {
    pageTitle: string;
    pageSubtitle?: string;
};

export function SearchAndFilter({ pageTitle, pageSubtitle }: TProps) {
    const [isActive, setIsActive] = useState(false);

    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const selectedCategories = useAppSelector(selectSelectedCategories);

    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const selectedSide = useAppSelector(selectSelectedSide);
    const selectedMeat = useAppSelector(selectSelectedMeat);

    const [
        getRecipesQuery,
        {
            data: dataSearchRecipes,
            error: errorSearchRecipes,
            isSuccess: isSuccessSearchRecipes,
            isError: isErrorSearchRecipes,
            isFetching: isFetchingSearchRecipes,
        },
    ] = useLazyGetRecipesQuery();

    useEffect(() => {
        if (!isFetchingSearchRecipes && isSuccessSearchRecipes && dataSearchRecipes) {
            dispatch(setRecipes(dataSearchRecipes.data));
            return;
        }
        if (isErrorSearchRecipes && errorSearchRecipes) {
            dispatch(setAppError(errorSearchRecipes));
        }
    }, [
        dataSearchRecipes,
        isSuccessSearchRecipes,
        isErrorSearchRecipes,
        errorSearchRecipes,
        isFetchingSearchRecipes,
    ]);

    function handleObFocus() {
        setIsActive(true);
    }

    function handleObBlur(e: React.FocusEvent<HTMLDivElement, Element>) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsActive(false);
        }
    }

    function handleSearch(value: string) {
        dispatch(setSearchQuery(value));

        getRecipesQuery({
            searchString: value,
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
    }

    function handleSetSelectedAllergens(allergens: string[]) {
        dispatch(setSelectedAllergens(allergens));
    }

    return (
        <VStack
            w='100%'
            maxW={{ base: 578, xl: 898 }}
            justifySelf='center'
            align='center'
            onFocusCapture={handleObFocus}
            onBlurCapture={handleObBlur}
            boxShadow={
                isActive
                    ? '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    : 'none'
            }
            borderRadius={24}
            mb={{ base: 4, lg: 6 }}
            pb={{ base: 4, lg: 8 }}
        >
            {isSuccessSearchRecipes &&
            !isFetchingSearchRecipes &&
            dataSearchRecipes.data.length === 0 ? (
                <Heading
                    fontWeight={600}
                    fontSize={16}
                    lineHeight='150%'
                    color='#000'
                    textAlign='center'
                    my={8}
                >
                    По вашему запросу ничего не найдено.
                    <br />
                    Попробуйте другой запрос
                </Heading>
            ) : (
                <PageTitle title={pageTitle} subTitle={pageSubtitle} />
            )}
            <VStack spacing={4} w='100%'>
                {isFetchingSearchRecipes ? (
                    <SearchLoader />
                ) : (
                    <>
                        <HStack
                            maxW={{ base: 480, lg: 550 }}
                            w='100%'
                            h={{ base: 8, lg: 12 }}
                            gap={3}
                            px={4}
                            justifySelf='center'
                        >
                            <Drawer />

                            <Search onclick={handleSearch} />
                        </HStack>
                        <Show above='lg'>
                            <Filter
                                selectedAllergens={selectedAllergens}
                                handleSetSelectedAllergens={handleSetSelectedAllergens}
                            />
                        </Show>
                    </>
                )}
            </VStack>
        </VStack>
    );
}
