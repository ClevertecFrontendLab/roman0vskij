import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Container,
    Hide,
    HStack,
    IconButton,
    Image,
    Show,
} from '@chakra-ui/react';

import HeaderProfile from '~/common/headerProfile';

import Logo from '../logo';
import Statistic from '../statistic';

export default function Header() {
    return (
        <Box
            as='header'
            data-test-id='header'
            bg='#ffffd3'
            h={[16, null, null, 20]}
            alignContent='center'
        >
            <Container maxW='100%' pr={[4, null, 5, 14]} pl={[4, null, 5, 4]}>
                <HStack justify='space-between'>
                    <Logo />
                    <Show above='lg'>
                        <Breadcrumb
                            spacing={0}
                            separator={<Image src='/breadcrumbArrow.svg' />}
                            flexGrow={1}
                        >
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/' color='rgba(0, 0, 0, 0.64)'>
                                    Главная
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/' color='rgba(0, 0, 0, 0.64)'>
                                    Веганская кухня
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/'>Вторые блюда</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <HeaderProfile />
                    </Show>
                    <Hide above='lg'>
                        <HStack spacing={0}>
                            <Statistic />
                            <IconButton
                                h={12}
                                w={12}
                                fontSize={20}
                                aria-label='Open menu'
                                icon={<HamburgerIcon />}
                                variant='none'
                            />
                        </HStack>
                    </Hide>
                </HStack>
            </Container>
        </Box>
    );
}
