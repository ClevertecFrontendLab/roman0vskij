import { Box, Container, HStack, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';

import { HeaderProfile } from '~/entities/user';
import { Breadcrumbs } from '~/features/breadcrumbs';
import { Logo } from '~/shared/ui/logo';
import { Statistic } from '~/shared/ui/statistic';
import { BurgerMenu } from '~/widgets/burgerMenu';

export function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isLargerThan1025] = useMediaQuery('(min-width: 1025px)');

    return (
        <Box
            as='header'
            data-test-id='header'
            bg={isMenuOpen ? '#fff' : '#ffffd3'}
            h={[16, null, null, 20]}
            alignContent='center'
            position='fixed'
            w='100%'
            top={0}
            zIndex={20}
        >
            <Container maxW='100%' pr={{ base: 0, lg: 14 }} pl={[4, null, 5, 4]}>
                <HStack justify='space-between' gap={0}>
                    <Logo />
                    {isLargerThan1025 && (
                        <>
                            <Breadcrumbs />
                            <HeaderProfile />
                        </>
                    )}
                    <HStack display={isLargerThan1025 ? 'none' : 'flex'} spacing={0}>
                        <Statistic />
                        <BurgerMenu
                            open={() => setMenuOpen(true)}
                            close={() => setMenuOpen(false)}
                        />
                    </HStack>
                </HStack>
                <Box
                    display={isMenuOpen ? 'block' : 'none'}
                    top={[16, null, null, 20]}
                    left={0}
                    position='fixed'
                    background='rgba(0, 0, 0, 0.16)'
                    backdropFilter='blur(2px)'
                    w='100%'
                    height='100%'
                    zIndex={2}
                />
            </Container>
        </Box>
    );
}
