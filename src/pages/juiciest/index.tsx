import {
    Box,
    Grid,
    GridItem,
    HStack,
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
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
import { GreenButton } from '~/shared/ui/greenButton';
import { PageWrapper } from '~/shared/ui/pageWrapper';
import { Title } from '~/shared/ui/title';
import { setAppError } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { SearchAndFilter } from '~/widgets/searchAndFilter';

export function JuiciestPage() {
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
    const dispatch = useAppDispatch();
    const juiciestRecipes = useAppSelector(selectJuiciestRecipes);

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
        if (!isFetchingJuiciest && isSuccessJuiciest && data.data) {
            dispatch(setJuiciestRecipes([...juiciestRecipes, ...data.data]));
        }

        if (isErrorJuiciest && errorJuiciest) {
            dispatch(setAppError(errorJuiciest));
        }
    }, [isErrorJuiciest, errorJuiciest, isFetchingJuiciest, isSuccessJuiciest, data]);

    function onclickHandler() {
        getRecipes({ limit: 8, page: page, sortBy: 'likes', sortOrder: 'DESC' });
        setPage((prev) => prev + 1);
    }

    return (
        <PageWrapper>
            <SearchAndFilter pageTitle='Самое сочное' />

            <SimpleGrid
                mt={{ base: 3, lg: 4, xl: 6 }}
                columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
                gap={{ base: 3, md: 4, xl: 6 }}
            >
                {juiciestRecipes
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

            {isLargerThan1000 ? <></> : <Box height={100} />}
        </PageWrapper>
    );
}
