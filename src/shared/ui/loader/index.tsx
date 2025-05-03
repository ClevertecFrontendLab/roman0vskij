import { Box, Spinner } from '@chakra-ui/react';

export function Loader() {
    return (
        <Box
            top={0}
            left={0}
            position='fixed'
            background='rgba(0, 0, 0, 0.16)'
            backdropFilter='blur(2px)'
            w='100%'
            height='100%'
            zIndex={20}
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <Box
                w={208}
                h={208}
                bgGradient='radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 45%) 0%, rgba(255, 255, 255, 0) 100%)'
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                <Spinner size='xl' />
            </Box>
        </Box>
    );
}
