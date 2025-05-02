import { Box, IconButton, Menu, MenuButton, MenuList, useMediaQuery } from '@chakra-ui/react';

import { Breadcrumbs } from '~/features/breadcrumbs';
import { CrossIcon, HamburgerIcon } from '~/shared/assets/icons';
import { SidebarFooter } from '~/shared/ui/sidebarFooter';
import { Accordion } from '~/widgets/accordion';

type TProps = {
    open: () => void;
    close: () => void;
};

export function BurgerMenu({ open, close }: TProps) {
    const [isLargerThan1025] = useMediaQuery('(min-width: 1025px)');

    return (
        <Menu>
            {({ isOpen, onClose }) => {
                isOpen ? open() : close();
                return (
                    <>
                        <MenuButton
                            as={IconButton}
                            h={12}
                            w={16}
                            fontSize={20}
                            aria-label='Open menu'
                            icon={
                                isOpen ? (
                                    <CrossIcon data-test-id='close-icon' full='#2d3748' />
                                ) : (
                                    <HamburgerIcon data-test-id='hamburger-icon' w={4} h={3} />
                                )
                            }
                            variant='none'
                            pr={{ base: 4 }}
                        />
                        {(isLargerThan1025 || isOpen) && (
                            <MenuList
                                data-test-id='nav'
                                zIndex={15}
                                maxW={344}
                                w='100%'
                                h='100%'
                                pt={4}
                                pb={0}
                                overflow='hidden'
                                bgColor='#fff'
                                right={0}
                                border='none'
                                borderRadius='0 0 12px 12px'
                            >
                                <Box flexShrink={0} px={5} mb={5} w='100%'>
                                    <Breadcrumbs onClose={onClose} />
                                </Box>

                                {(!isLargerThan1025 || isOpen) && (
                                    <Box
                                        flexShrink={1}
                                        overflowY='auto'
                                        h='calc(85vh - 240px)'
                                        maxH='fit-content'
                                    >
                                        <Accordion isMobile />
                                    </Box>
                                )}

                                <Box flexShrink={0} mt={7}>
                                    <SidebarFooter />
                                </Box>
                            </MenuList>
                        )}
                    </>
                );
            }}
        </Menu>
    );
}
