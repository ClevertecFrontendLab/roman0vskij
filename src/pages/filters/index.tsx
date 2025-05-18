import { Box, SimpleGrid, useMediaQuery } from '@chakra-ui/react';

import { MainCard } from '~/entities/mainCard';
import { PageWrapper } from '~/shared/ui/pageWrapper';
import { useAppSelector } from '~/store/hooks';
import { selectData } from '~/widgets/drawer';
import { SearchAndFilter } from '~/widgets/searchAndFilter';

export function FiltersPage() {
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

    const data = useAppSelector(selectData);

    return (
        <PageWrapper>
            <SearchAndFilter pageTitle='Фильтры' />
            <SimpleGrid
                mt={{ base: 3, lg: 4, xl: 6 }}
                columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
                gap={{ base: 3, md: 4, xl: 6 }}
            >
                {data.map((recipe, i) => (
                    <MainCard key={`main${i}`} {...recipe} index={i} />
                ))}
            </SimpleGrid>
            {isLargerThan1000 ? <></> : <Box height={100} />}
        </PageWrapper>
    );
}
