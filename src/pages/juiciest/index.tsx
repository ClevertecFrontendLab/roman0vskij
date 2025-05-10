import {
    Box,
    Grid,
    GridItem,
    HStack,
    Show,
    SimpleGrid,
    Stack,
    Text,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { selectRandomCategory } from '~/entities/category';
import { CookCard } from '~/entities/cookCard';
import { MainCard } from '~/entities/mainCard';
import { selectJuiciestRecipes, selectRandomRecipes, setJuiciestRecipes } from '~/entities/recipe';
import { RelevantRecipeCard } from '~/entities/relevantRecipeCard';
import { useAppInit } from '~/features/appInit/model/useAppInit';
import { Filter } from '~/features/filter';
import { useFilterByAllergens } from '~/features/filter';
import { useSearch } from '~/features/search';
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
import { GreenButton } from '~/shared/ui/greenButton';
import PageLoader from '~/shared/ui/pageLoader';
import { PageTitle } from '~/shared/ui/pageTitle';
import { PageWrapper } from '~/shared/ui/pageWrapper';
import { SearchAndFilter } from '~/shared/ui/searchAndFilter';
import { Title } from '~/shared/ui/title';
import { pageLoadingSelector, setAppError } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Drawer } from '~/widgets/drawer';

export function JuiciestPage() {
    useAppInit();
    const isPageLoading = useAppSelector(pageLoadingSelector);

    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
    const dispatch = useAppDispatch();
    const juiciestRecipes = useAppSelector(selectJuiciestRecipes);

    const SearchInput = useSearch();
    const filterByAllergens = useFilterByAllergens();

    const filtredData = filterByAllergens(juiciestRecipes);

    const randomCategory = useAppSelector(selectRandomCategory);
    const randomRecipes = useAppSelector(selectRandomRecipes);

    const [page, setPage] = useState(2);

    const [
        getRecipes,
        {
            data,
            isSuccess: isSuccessJuiciest,
            isFetching: isFetchingJuiciest,
            isError: isErrorJuiciest,
            error: errorJuiciest,
        },
    ] = useLazyGetRecipesQuery();

    useEffect(() => {
        // dispatch(setPageLoader(isFetchingJuiciest));

        if (!isFetchingJuiciest && isSuccessJuiciest && data) {
            dispatch(setJuiciestRecipes([...juiciestRecipes, ...data.data]));
        }

        if (isErrorJuiciest && errorJuiciest) {
            dispatch(setAppError(`Init error: ${errorJuiciest.toString()}`));
        } else {
            dispatch(setAppError(null));
        }
    }, [isErrorJuiciest, errorJuiciest, isFetchingJuiciest, isSuccessJuiciest, data]);

    function onclickHandler() {
        getRecipes({ limit: 8, page: page, sortBy: 'likes', sortOrder: 'DESC' });
        setPage((prev) => prev + 1);
    }

    return (
        <PageWrapper>
            <SearchAndFilter>
                <PageTitle title='Самое сочное' />
                <VStack spacing={4} w='100%'>
                    <HStack
                        maxW={{ base: 480, lg: 550 }}
                        w='100%'
                        h={{ base: 8, lg: 12 }}
                        gap={3}
                        px={4}
                        justifySelf='center'
                    >
                        <Drawer />

                        <SearchInput />
                    </HStack>
                    <Show above='lg'>
                        <Filter />
                    </Show>
                </VStack>
            </SearchAndFilter>
            {isPageLoading ? (
                <PageLoader />
            ) : (
                <>
                    <SimpleGrid
                        mt={{ base: 3, lg: 4, xl: 6 }}
                        columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
                        gap={{ base: 3, md: 4, xl: 6 }}
                    >
                        {filtredData
                            .slice()
                            .sort((a, b) => b.likes - a.likes)
                            .map((recipe, i) => (
                                <MainCard key={`main${i}`} {...recipe} index={i} />
                            ))}
                    </SimpleGrid>
                    <HStack justify='center' mt={4}>
                        <GreenButton
                            data-test-id='load-more-button'
                            onclick={onclickHandler}
                            text={isFetchingJuiciest ? 'Загрузка' : 'Загрузить еще'}
                        />
                    </HStack>

                    {randomCategory && randomRecipes && (
                        <Stack
                            mt={{ base: 8, lg: 10 }}
                            borderTop='1px solid rgba(0, 0, 0, 0.08)'
                            pt={{ base: 2, lg: 6 }}
                        >
                            <Grid
                                templateColumns={{
                                    base: '1fr',
                                    lg: 'repeat(3, 1fr)',
                                    xl: 'repeat(2, 1fr)',
                                }}
                                templateRows={{ base: '32px 1fr', lg: '1fr' }}
                                gap={{ base: 3, lg: 4 }}
                            >
                                <GridItem rowSpan={1} colSpan={1}>
                                    <Title title={randomCategory?.title} />
                                </GridItem>
                                <GridItem rowSpan={1} colSpan={{ base: 1, lg: 2, xl: 1 }}>
                                    <Text
                                        fontWeight={500}
                                        fontSize={{ base: 14, lg: 16 }}
                                        lineHeight={{ base: '143%', lg: '150%' }}
                                        color=' rgba(0, 0, 0, 0.64)'
                                    >
                                        {randomCategory.description}
                                    </Text>
                                </GridItem>
                            </Grid>
                            <Grid
                                templateColumns={{
                                    base: '1fr',
                                    md: 'repeat(3, 1fr)',
                                    xl: 'repeat(4, 1fr)',
                                }}
                                templateRows={{ base: 'repeat(3, 1fr)', md: '1fr' }}
                                mt={{ base: 4, lg: 6 }}
                                gap={{ base: 3, lg: 4 }}
                            >
                                {randomRecipes.slice(0, 2).map((recipe, i) => (
                                    <GridItem key={`recipe${i}`} rowSpan={1} colSpan={1}>
                                        <RelevantRecipeCard {...recipe} />
                                    </GridItem>
                                ))}

                                <GridItem rowSpan={1} colSpan={{ base: 1, xl: 2 }}>
                                    <VStack gap={3}>
                                        {randomRecipes.slice(2, 5).map((card, i) => (
                                            <CookCard key={`cook${i}`} {...card} />
                                        ))}
                                    </VStack>
                                </GridItem>
                            </Grid>
                        </Stack>
                    )}
                </>
            )}
            {isLargerThan1000 ? <></> : <Box height={100} />}
        </PageWrapper>
    );
}
