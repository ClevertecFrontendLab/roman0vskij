import { Box, Spinner } from '@chakra-ui/react';

import { BlurBg } from '../blurBg';

export function Loader() {
    return (
        <BlurBg data-test-id='app-loader' zIndex={99}>
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
        </BlurBg>
    );
}
