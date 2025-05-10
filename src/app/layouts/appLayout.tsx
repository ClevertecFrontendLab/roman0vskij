import { Box } from '@chakra-ui/react';

import { Routing } from '../routing';

export function AppLayout() {
    return (
        <Box minH='100%'>
            <Routing />
        </Box>
    );
}
