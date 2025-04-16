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
import { useLocation } from 'react-router';

import { HeaderProfile } from '~/common/headerProfile';
import { mockCategories } from '~/shared/mock/mockCategories';

import { Logo } from '../logo';
import { Statistic } from '../statistic';

export function Header() {
    const location = useLocation();
    const [_, category, subCategory] = location.pathname.split('/');
    const categoryName =
        category === 'juiciest'
            ? 'Самое сочное'
            : mockCategories.find((categ) => categ.id === category)?.name;
    const subCategoryName = mockCategories
        .find((categ) => categ.id === category)
        ?.subCategories.find((subCateg) => subCateg.id === subCategory)?.name;
    return (
        <Box
            as='header'
            data-test-id='header'
            bg='#ffffd3'
            h={[16, null, null, 20]}
            alignContent='center'
            position='fixed'
            w='100%'
            top={0}
            zIndex={10}
        >
            <Container maxW='100%' pr={[4, null, 5, 14]} pl={[4, null, 5, 4]}>
                <HStack justify='space-between' gap={0}>
                    <Logo />
                    <Show breakpoint='(min-width: 1000px)'>
                        <Breadcrumb
                            spacing={0}
                            separator={<Image src='/src/assets/breadcrumbArrow.svg' />}
                            flexGrow={1}
                        >
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href='/'
                                    color={categoryName ? 'rgba(0, 0, 0, 0.64)' : '#000'}
                                >
                                    Главная
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {categoryName && (
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href={`/${category}`}
                                        color={subCategoryName ? 'rgba(0, 0, 0, 0.64)' : '#000'}
                                    >
                                        {categoryName}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            )}
                            {subCategoryName && (
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href={`/${category}/${subCategory}`}
                                        color='#000'
                                    >
                                        {subCategoryName}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            )}
                        </Breadcrumb>
                        <HeaderProfile />
                    </Show>
                    <Hide breakpoint='(min-width: 1000px)'>
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
