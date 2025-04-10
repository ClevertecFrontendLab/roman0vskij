import { Box, Hide, IconButton, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';

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

    return (
        <Hide above='lg'>
            <Box
                as='footer'
                h={84}
                bgColor='#ffffd3'
                position='fixed'
                w='100%'
                bottom={0}
                zIndex={10}
            >
                <SimpleGrid columns={4} h={84} spacing={0}>
                    <VStack
                        {...vStackStyles}
                        bgGradient={
                            isHome
                                ? 'radial-gradient(62.52% 62.51% at 48.89% 37.5%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
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
        </Hide>
    );
}
