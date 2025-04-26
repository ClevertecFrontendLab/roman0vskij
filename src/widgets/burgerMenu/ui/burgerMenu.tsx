import { Box, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';

import { Breadcrumbs } from '~/features/breadcrumbs';
import { CrossIcon, HamburgerIcon } from '~/shared/assets/icons';
import { SidebarFooter } from '~/shared/ui/sidebarFooter';
import { Accordion } from '~/widgets/accordion';

type TProps = {
    open: () => void;
    close: () => void;
};

export function BurgerMenu({ open, close }: TProps) {
    return (
        <Menu onOpen={open} onClose={close}>
            {({ isOpen, onClose }) => (
                <>
                    <MenuButton
                        as={IconButton}
                        h={12}
                        w={16}
                        fontSize={20}
                        aria-label='Open menu'
                        icon={isOpen ? <CrossIcon full='#2d3748' /> : <HamburgerIcon w={4} h={3} />}
                        variant='none'
                        pr={{ base: 4 }}
                    />
                    <MenuList
                        zIndex={15}
                        maxW={344}
                        w='100%'
                        maxH='80vh'
                        pt={4}
                        pb={0}
                        overflow='hidden'
                        bgColor='#fff'
                        right={0}
                    >
                        <Box flexShrink={0} px={5} mb={5} w='100%'>
                            <Breadcrumbs onClose={onClose} />
                        </Box>
                        <Box flexShrink={1} overflowY='auto' h='calc(80vh - 240px)'>
                            <Accordion isMobile />
                        </Box>
                        <Box flexShrink={0} mt={7}>
                            <SidebarFooter />
                        </Box>
                    </MenuList>
                </>
            )}
        </Menu>
    );
}
