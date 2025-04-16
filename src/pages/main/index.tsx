import {
    Box,
    Grid,
    GridItem,
    Hide,
    HStack,
    IconButton,
    Show,
    SimpleGrid,
    Stack,
    Text,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { LeftArrowIcon, RightArrowIcon } from '~/assets/icons';
import { BlogCard } from '~/common/blogCard';
import { CookCard } from '~/common/cookCard';
import { Filter } from '~/common/filter';
import { GreenButton } from '~/common/greenButton';
import { MainCard } from '~/common/mainCard';
import { PageTitle } from '~/common/pageTitle';
import { RecipeCard } from '~/common/recipeCard';
import { RelevantRecipeCard } from '~/common/relevantRecipeCard';
import { Search } from '~/common/search';
import { Title } from '~/common/title';
import { mockBlogCards } from '~/shared/mock/mockBlogCards';
import { mockCookCards } from '~/shared/mock/mockCookCards';
import { mockMainCards } from '~/shared/mock/mockMainCards';
import { mockRecipes } from '~/shared/mock/mockRecipes';
import { mockRelevantRecipes } from '~/shared/mock/mockRelevantRecipes';

export function MainPage() {
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
    const navigate = useNavigate();

    function onClickHandler() {
        navigate('/juiciest');
    }

    return (
        <Box
            as='main'
            maxW='1920px'
            w='100%'
            m='0 auto'
            pt={{ base: '64px', lg: '80px' }}
            px={{ base: 4, md: 5, lg: '280px' }}
        >
            <PageTitle title='Приятного аппетита!' />
            <VStack mb={8} spacing={4}>
                <Search />
                <Show above='lg'>
                    <Filter />
                </Show>
            </VStack>
            <Title title='Новые рецепты' />
            <Box position='relative'>
                <Show above='lg'>
                    <IconButton
                        key='previous button'
                        bgColor='#000'
                        w={12}
                        h={12}
                        pos='absolute'
                        top='171px'
                        left={-2}
                        zIndex={10}
                        borderRadius={6}
                        aria-label='previous button'
                        icon={<LeftArrowIcon fill='#ffffd3' />}
                        variant='none'
                    />
                    <IconButton
                        key='next button'
                        bgColor='#000'
                        w={12}
                        h={12}
                        pos='absolute'
                        top='171px'
                        right={-2}
                        zIndex={10}
                        borderRadius={6}
                        aria-label='next button'
                        icon={<RightArrowIcon fill='#ffffd3' />}
                        variant='none'
                    />
                </Show>
                <Box overflowX='hidden' overflowY='visible'>
                    <HStack
                        mt={{ base: 3, lg: 6 }}
                        pb={3}
                        gap={{ base: 3, xl: 6 }}
                        w='max-content'
                        overflowX='auto'
                        overflowY='visible'
                    >
                        {mockRecipes.map((recipe, i) => (
                            <RecipeCard key={`recipe${i}`} {...recipe} />
                        ))}
                    </HStack>
                </Box>
            </Box>
            <HStack justify='space-between' mt={{ base: 5, lg: 7 }}>
                <Title title='Самое сочное ' />
                <GreenButton
                    onClick={onClickHandler}
                    data-test-id='juiciest-link'
                    text='Вся подборка'
                    hasArrow
                    showOnLg
                />
            </HStack>
            <SimpleGrid
                mt={{ base: 3, lg: 4, xl: 6 }}
                columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
                gap={{ base: 3, md: 4, xl: 6 }}
            >
                {mockMainCards.map((recipe, i) => (
                    <MainCard key={`main${i}`} {...recipe} />
                ))}
            </SimpleGrid>
            <HStack justify='center' mt={3}>
                <GreenButton
                    data-test-id='juiciest-link-mobile'
                    text='Вся подборка'
                    hasArrow
                    hideOnLg
                />
            </HStack>
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
            <Stack
                mt={{ base: 8, lg: 10 }}
                borderTop='1px solid rgba(0, 0, 0, 0.08)'
                pt={{ base: 2, lg: 6 }}
            >
                <Grid
                    templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)', xl: 'repeat(2, 1fr)' }}
                    templateRows={{ base: '32px 1fr', lg: '1fr' }}
                    gap={{ base: 3, lg: 4 }}
                >
                    <GridItem rowSpan={1} colSpan={1}>
                        <Title title='Веганская кухня' />
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={{ base: 1, lg: 2, xl: 1 }}>
                        <Text
                            fontWeight={500}
                            fontSize={{ base: 14, lg: 16 }}
                            lineHeight={{ base: '143%', lg: '150%' }}
                            color=' rgba(0, 0, 0, 0.64)'
                        >
                            Интересны не только убеждённым вегетарианцам, но и тем, кто хочет
                            попробовать вегетарианскую диету и готовить вкусные вегетарианские
                            блюда.
                        </Text>
                    </GridItem>
                </Grid>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }}
                    templateRows={{ base: 'repeat(3, 1fr)', md: '1fr' }}
                    mt={{ base: 4, lg: 6 }}
                    gap={{ base: 3, lg: 4 }}
                >
                    {mockRelevantRecipes.map((recipe, i) => (
                        <GridItem key={`recipe${i}`} rowSpan={1} colSpan={1}>
                            <RelevantRecipeCard {...recipe} />
                        </GridItem>
                    ))}

                    <GridItem rowSpan={1} colSpan={{ base: 1, xl: 2 }}>
                        <VStack gap={3}>
                            {mockCookCards.map((card, i) => (
                                <CookCard key={`cook${i}`} {...card} />
                            ))}
                        </VStack>
                    </GridItem>
                </Grid>
            </Stack>
            {isLargerThan1000 ? <></> : <Box height={100} />}
        </Box>
    );
}
