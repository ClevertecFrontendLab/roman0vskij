import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';

import { SignOutIcon } from '~/shared/assets/icons';

export function SidebarFooter() {
    return (
        <VStack
            data-test-id='footer'
            as='footer'
            px={6}
            pb={8}
            gap={4}
            w='100%'
            align='flex-start'
            bottom={0}
        >
            <Text
                fontWeight={500}
                fontSize={12}
                lineHeight='133%'
                color='rgba(0, 0, 0, 0.24)'
                w='80%'
            >
                Версия программы 03.25
            </Text>
            <Text
                fontWeight={400}
                fontSize={12}
                lineHeight='133%'
                color='rgba(0, 0, 0, 0.64)'
                w='80%'
            >
                Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
            </Text>

            <HStack align='center' justify='flex-start' w='fit-content' gap={0}>
                <IconButton
                    aria-label='sign out button'
                    icon={<SignOutIcon />}
                    variant='none'
                    h={3}
                    display='flex'
                    justifyContent='flex-start'
                />
                <Box
                    as='label'
                    htmlFor='sign out button'
                    w='100%'
                    fontWeight={600}
                    fontSize={12}
                    lineHeight='133%'
                    color='#000'
                    ml='-22px'
                    cursor='pointer'
                >
                    Выйти
                </Box>
            </HStack>
        </VStack>
    );
}
