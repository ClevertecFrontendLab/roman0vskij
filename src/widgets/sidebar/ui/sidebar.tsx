import { useMediaQuery, VStack } from '@chakra-ui/react';

import { SidebarFooter } from '~/shared/ui/sidebarFooter';
import { Accordion } from '~/widgets/accordion';

export function Sidebar() {
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

    return isLargerThan1200 ? (
        <VStack
            display={{ base: 'none', lg: 'flex' }}
            as='aside'
            pos='fixed'
            w={256}
            h='100%'
            pt={114}
            boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
            justify='space-between'
            overflow='auto'
            gap={0}
        >
            <Accordion />
            <SidebarFooter />
        </VStack>
    ) : (
        <></>
    );
}
