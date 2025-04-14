import { Box, IconButton, Image, SimpleGrid, Text, useMediaQuery, VStack } from '@chakra-ui/react';

import { AvatarIcon, HomeIcon, NoteIcon, SearchIcon } from '~/assets/icons';

export default function Footer() {
    const vStackStyles = {
        justify: 'flex-start',
        flex: '1 1 auto',
        pt: 3.5,
        spacing: 1,
        h: 84,
    };
    const buttonStyles = {
        w: 10,
        h: 10,
        isRound: true,
        fontSize: '20px',
        colorScheme: 'none',
    };
    const textStyles = {
        fontSize: '12px',
        lineHeight: '133%',
        color: 'rgba(0, 0, 0, 0.64)',
    };
    const isHome = true;
    const avatar = '/src/assets/mockData/avatar.png';
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

    return isLargerThan1000 ? (
        <></>
    ) : (
        <Box
            as='footer'
            data-test-id='footer'
            h={84}
            bgColor='#ffffd3'
            position='fixed'
            w='100%'
            bottom={0}
            zIndex={10}
            boxShadow='0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        >
            <SimpleGrid columns={4} h={84} spacing={0}>
                <VStack
                    {...vStackStyles}
                    bgGradient={
                        isHome
                            ? 'radial-gradient(42.52% 52.51% at 48.89% 37.5%, rgba(196, 255, 97, 70%) 0%, rgba(255, 255, 255, 0) 100%)'
                            : 'transparent'
                    }
                >
                    <IconButton
                        {...buttonStyles}
                        bgColor={isHome ? '#000' : 'none'}
                        aria-label='Home'
                        icon={
                            <HomeIcon
                                fill={isHome ? ' #ffffd3' : '#000'}
                                w={isHome ? 4 : 6}
                                h={isHome ? 4 : 6}
                            />
                        }
                    />
                    <Text {...textStyles} fontWeight={isHome ? 500 : 400}>
                        Главная
                    </Text>
                </VStack>
                <VStack {...vStackStyles} bgGradient='transparent'>
                    <IconButton
                        {...buttonStyles}
                        bgColor='none'
                        aria-label='Search'
                        icon={<SearchIcon />}
                    />
                    <Text {...textStyles}>Поиск</Text>
                </VStack>
                <VStack {...vStackStyles} bgGradient='transparent'>
                    <IconButton
                        {...buttonStyles}
                        bgColor='none'
                        aria-label='Note'
                        icon={<NoteIcon />}
                    />
                    <Text {...textStyles}>Записать</Text>
                </VStack>
                <VStack {...vStackStyles} bgGradient='transparent'>
                    <IconButton
                        {...buttonStyles}
                        bgColor='rgba(0, 0, 0, 0.24)'
                        aria-label='Profile'
                        icon={avatar ? <Image src={avatar} alt='avatar' /> : <AvatarIcon />}
                    />
                    <Text {...textStyles}>Мой профиль</Text>
                </VStack>
            </SimpleGrid>
        </Box>
    );
}
