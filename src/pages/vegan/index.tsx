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

import { CookCard } from '~/entities/cookCard';
import { MainCard } from '~/entities/mainCard';
import { RelevantRecipeCard } from '~/entities/relevantRecipeCard';
import { Filter } from '~/features/filter';
import { Search } from '~/features/search';
import { Tabs } from '~/features/tabs';
import { mockCookCards } from '~/shared/mock/mockCookCards';
import { mockMainCards } from '~/shared/mock/mockMainCards';
import { mockRelevantRecipes } from '~/shared/mock/mockRelevantRecipes';
import { GreenButton } from '~/shared/ui/greenButton';
import { PageTitle } from '~/shared/ui/pageTitle';
import { Title } from '~/shared/ui/title';

export function VeganPage() {
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

    return (
        <Box
            as='main'
            maxW='1920px'
            w='100%'
            m='0 auto'
            pt={{ base: '64px', lg: '80px' }}
            px={{ base: 4, md: 5, lg: '280px' }}
        >
            <PageTitle
                title='Веганская кухня'
                subTitle='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />
            <VStack mb={8} spacing={4}>
                <Search />
                <Show above='lg'>
                    <Filter />
                </Show>
            </VStack>

            <HStack pos='relative' justify='center' overflow='hidden' h={42}>
                <Box pos='absolute' w='max-content' top={0}>
                    <Tabs />
                </Box>
            </HStack>

            <SimpleGrid
                mt={{ base: 3, lg: 4, xl: 6 }}
                columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
                gap={{ base: 3, md: 4, xl: 6 }}
            >
                {mockMainCards.map((recipe, i) => (
                    <MainCard key={`main${i}`} {...recipe} />
                ))}
                {mockMainCards.map((recipe, i) => (
                    <MainCard key={`mainmain${i}`} {...recipe} />
                ))}
            </SimpleGrid>
            <HStack justify='center' mt={4}>
                <GreenButton text='Загрузить еще' />
            </HStack>

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
                        <Title title='Десерты, выпечка' />
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={{ base: 1, lg: 2, xl: 1 }}>
                        <Text
                            fontWeight={500}
                            fontSize={{ base: 14, lg: 16 }}
                            lineHeight={{ base: '143%', lg: '150%' }}
                            color=' rgba(0, 0, 0, 0.64)'
                        >
                            Без них невозможно представить себе ни современную, ни традиционную
                            кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб -
                            рецепты изделий из теста многообразны и невероятно популярны.
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
