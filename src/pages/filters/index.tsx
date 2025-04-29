import { Box, HStack, Show, SimpleGrid, useMediaQuery, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { MainCard } from '~/entities/mainCard';
import { Filter } from '~/features/filter';
import { useSearch } from '~/features/search';
import { PageTitle } from '~/shared/ui/pageTitle';
import { PageWrapper } from '~/shared/ui/pageWrapper';
import { SearchAndFilter } from '~/shared/ui/searchAndFilter';
import { Drawer, selectData } from '~/widgets/drawer';

export function FiltersPage() {
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

    const { SearchInput, filterBySearchQuery } = useSearch();

    const data = useSelector(selectData);

    const filtredData = filterBySearchQuery(data);

    return (
        <PageWrapper>
            <SearchAndFilter>
                <PageTitle title='Фильтры' />
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
            {isLargerThan1000 ? <></> : <Box height={100} />}
        </PageWrapper>
    );
}
