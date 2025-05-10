import { Box, Spinner } from '@chakra-ui/react';

export default function SearchLoader() {
    return (
        <Box
            w={134}
            h={134}
            bgGradient='radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 45%) 0%, rgba(255, 255, 255, 0) 100%)'
            display='flex'
            justifyContent='center'
            alignItems='center'
            data-test-id='loader-search-block'
        >
            <Spinner size='xl' />
        </Box>
    );
}
