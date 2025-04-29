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
import { useFilterByAllergens } from '~/features/filter/model/filterByAllergens';
import { useSearch } from '~/features/search';
import { mockData } from '~/shared/mock/mockData';
import { GreenButton } from '~/shared/ui/greenButton';
import { PageTitle } from '~/shared/ui/pageTitle';
import { PageWrapper } from '~/shared/ui/pageWrapper';
import { SearchAndFilter } from '~/shared/ui/searchAndFilter';
import { Title } from '~/shared/ui/title';
import { Drawer } from '~/widgets/drawer';

export function JuiciestPage() {
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
    const { SearchInput, filterBySearchQuery } = useSearch();
    const filterByAllergens = useFilterByAllergens();

    const filtredData = filterBySearchQuery(filterByAllergens(mockData));

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
                    {mockData.slice(0, 2).map((recipe, i) => (
                        <GridItem key={`recipe${i}`} rowSpan={1} colSpan={1}>
                            <RelevantRecipeCard {...recipe} />
                        </GridItem>
                    ))}

                    <GridItem rowSpan={1} colSpan={{ base: 1, xl: 2 }}>
                        <VStack gap={3}>
                            {mockData.slice(0, 3).map((card, i) => (
                                <CookCard key={`cook${i}`} {...card} />
                            ))}
                        </VStack>
                    </GridItem>
                </Grid>
            </Stack>
            {isLargerThan1000 ? <></> : <Box height={100} />}
        </PageWrapper>
    );
}
