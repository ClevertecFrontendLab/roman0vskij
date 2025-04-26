import { Box, HStack, Image, Show } from '@chakra-ui/react';

export function Logo() {
    return (
        <Box h={8} mr={[3, null, null, 32]} minW={{ md: '135px' }}>
            <HStack spacing='6.97px' align='flex-end' w='100%'>
                <Image src='/src/shared/assets/logo/logoImg.svg' alt='logo image' />
                <Show above='md'>
                    <Image src='/src/shared/assets/logo/logoText.svg' alt='logo text' mb='1.21px' />
                </Show>
            </HStack>
        </Box>
    );
}
