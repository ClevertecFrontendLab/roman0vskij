import { Box, HStack, Image, Show } from '@chakra-ui/react';

export default function Logo() {
    return (
        <Box h={8} mr={[0, null, null, 32]}>
            <HStack spacing='6.97px' align='flex-end'>
                <Image src='/logoImg.svg' alt='logo image' />
                <Show above='md'>
                    <Image src='/logoText.svg' alt='logo text' mb='1.21px' />
                </Show>
            </HStack>
        </Box>
    );
}
