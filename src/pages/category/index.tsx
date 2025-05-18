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
import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { selectCategories, selectRandomCategory } from '~/entities/category';
import { CookCard } from '~/entities/cookCard';
import { MainCard } from '~/entities/mainCard';
import { selectRandomRecipes, selectRecipes } from '~/entities/recipe';
import { RelevantRecipeCard } from '~/entities/relevantRecipeCard';
import { useGetCategoryQuery } from '~/query/services/categories';
import { useLazyGetRecipesBySubcategoryQuery } from '~/query/services/recipes';
import { GreenButton } from '~/shared/ui/greenButton';
import { PageWrapper } from '~/shared/ui/pageWrapper';
import { Title } from '~/shared/ui/title';
import { setAppError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { SearchAndFilter } from '~/widgets/searchAndFilter';
import { Tabs } from '~/widgets/tabs';

export function CategoryPage() {
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
    const dispatch = useAppDispatch();
    const location = useLocation();
    const recipes = useAppSelector(selectRecipes);
    const randomCategory = useAppSelector(selectRandomCategory);
    const randomRecipes = useAppSelector(selectRandomRecipes);
    const [_, category, subcategory] = location.pathname.split('/');

    const categories = useAppSelector(selectCategories);
    const currentCategory = categories.find((c) => c.category === category);

    const {
        data: dataCategory,
        error: errorCategory,
        isSuccess: isSuccessCategory,
        isError: isErrorCategory,
        isFetching: isFetchingCategory,
    } = useGetCategoryQuery(currentCategory?._id ?? '');

    useEffect(() => {
        if (dataCategory) {
            const subcategoryId = dataCategory.subCategories.find(
                (sub) => sub.category === subcategory,
            )?._id;
            subcategoryId &&
                getRecipesBySubcategory({
                    subcategoryId: subcategoryId,
                });
        }
    }, [subcategory]);

    useEffect(() => {
        dispatch(setAppLoader(isFetchingCategory));

        if (!isFetchingCategory && isSuccessCategory && dataCategory) {
            const subcategoryId = dataCategory.subCategories.find(
                (sub) => sub.category === subcategory,
            )?._id;
            subcategoryId &&
                getRecipesBySubcategory({
                    subcategoryId: subcategoryId,
                });
        }
        if (isErrorCategory && errorCategory) {
            dispatch(setAppError(errorCategory));
        }
    }, [dataCategory, isSuccessCategory, isErrorCategory, errorCategory, isFetchingCategory]);

    const [
        getRecipesBySubcategory,
        {
            data: recipesData,
            isFetching: isFetchingRecipes,
            isError: isErrorRecipes,
            error: errorRecipes,
        },
    ] = useLazyGetRecipesBySubcategoryQuery();

    useEffect(() => {
        dispatch(setAppLoader(isFetchingRecipes));

        if (isErrorRecipes && errorRecipes) {
            dispatch(setAppError(errorRecipes));
        }
    }, [isFetchingRecipes, isErrorRecipes, errorRecipes]);

    return (
        <PageWrapper>
            <SearchAndFilter
                pageTitle={currentCategory!.title}
                pageSubtitle={currentCategory!.description}
            />

            {recipes.length === 0 ? (
                <>
                    <Tabs />

                    {!isFetchingRecipes && recipesData?.data && (
                        <>
                            <SimpleGrid
                                mt={{ base: 3, lg: 4, xl: 6 }}
                                columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
                                gap={{ base: 3, md: 4, xl: 6 }}
                            >
                                {recipesData.data.map((recipe, i) => (
                                    <MainCard key={`main${i}`} {...recipe} index={i} />
                                ))}
                            </SimpleGrid>
                            <HStack justify='center' mt={4}>
                                <GreenButton text='Загрузить еще' />
                            </HStack>
                        </>
                    )}

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
            ) : (
                <>
                    <SimpleGrid
                        mt={{ base: 3, lg: 4, xl: 6 }}
                        columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
                        gap={{ base: 3, md: 4, xl: 6 }}
                    >
                        {recipes.map((recipe, i) => (
                            <MainCard key={`main${i}`} {...recipe} index={i} />
                        ))}
                    </SimpleGrid>
                </>
            )}

            {isLargerThan1000 ? <></> : <Box height={100} />}
        </PageWrapper>
    );
}
