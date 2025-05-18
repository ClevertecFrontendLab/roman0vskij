import {
    Box,
    Grid,
    GridItem,
    Hide,
    HStack,
    Show,
    SimpleGrid,
    Stack,
    Text,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';

import { BlogCard } from '~/entities/blogCard';
import { selectRandomCategory, TCategory } from '~/entities/category';
import { CookCard } from '~/entities/cookCard';
import { MainCard } from '~/entities/mainCard';
import { selectJuiciestRecipes, selectRandomRecipes, selectRecipes } from '~/entities/recipe';
import { RelevantRecipeCard } from '~/entities/relevantRecipeCard';
import { useCustomNavigate } from '~/shared/hooks/useCustomNavigate';
import { mockBlogCards } from '~/shared/mock/mockBlogCards';
import { GreenButton } from '~/shared/ui/greenButton';
import { PageWrapper } from '~/shared/ui/pageWrapper';
import { Title } from '~/shared/ui/title';
import { useAppSelector } from '~/store/hooks';
import { SearchAndFilter } from '~/widgets/searchAndFilter';
import { Slider } from '~/widgets/slider';

export function HomePage() {
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
    const navigate = useCustomNavigate();

    const recipes = useAppSelector(selectRecipes);
    const juiciestRecipes = useAppSelector(selectJuiciestRecipes);
    const randomCategory = useAppSelector(selectRandomCategory) as TCategory;
    const randomRecipes = useAppSelector(selectRandomRecipes);

    function onClickHandler() {
        navigate('/the-juiciest');
    }

    return (
        <PageWrapper>
            <SearchAndFilter pageTitle='Приятного аппетита!' />

            {recipes.length === 0 ? (
                <>
                    <Title title='Новые рецепты' />

                    <Slider />

                    {juiciestRecipes?.length ? (
                        <>
                            <HStack justify='space-between' mt={{ base: 5, lg: 7 }}>
                                <Title title='Самое сочное ' />
                                <GreenButton
                                    onclick={onClickHandler}
                                    data-test-id='juiciest-link'
                                    text='Вся подборка'
                                    hasArrow
                                    showOnMd
                                />
                            </HStack>

                            <SimpleGrid
                                mt={{ base: 3, lg: 4, xl: 6 }}
                                columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
                                gap={{ base: 3, md: 4, xl: 6 }}
                            >
                                {juiciestRecipes.map((recipe, i) => (
                                    <MainCard key={`main${i}`} {...recipe} index={i} />
                                ))}
                            </SimpleGrid>

                            <HStack justify='center' mt={3}>
                                <GreenButton
                                    onclick={onClickHandler}
                                    data-test-id='juiciest-link-mobile'
                                    text='Вся подборка'
                                    hasArrow
                                    hideOnMd
                                />
                            </HStack>
                        </>
                    ) : (
                        <></>
                    )}

                    <Stack
                        bgColor='#c4ff61'
                        mt={{ base: 8, lg: 10 }}
                        p={{ base: 3, lg: 6 }}
                        borderRadius={16}
                        gap={{ base: 3, lg: 4, xl: 6 }}
                    >
                        <HStack justify='space-between' align='center'>
                            <Title title='Кулинарные блоги' isForBlog />
                            <Show above='lg'>
                                <GreenButton text='Все авторы' hasArrow bgColor='#c4ff61' />
                            </Show>
                        </HStack>
                        <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 3, lg: 4 }}>
                            {mockBlogCards.map((blog, i) => (
                                <BlogCard key={`blog${i}`} {...blog} />
                            ))}
                        </Stack>
                        <Hide above='lg'>
                            <HStack justify='center'>
                                <GreenButton text='Все авторы' hasArrow bgColor='#c4ff61' />
                            </HStack>
                        </Hide>
                    </Stack>

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
