import { Box } from '@chakra-ui/react';

type TProps = {
    children?: React.ReactNode;
};
export function PageWrapper({ children }: TProps) {
    return (
        <Box
            as='main'
            maxW='1920px'
            w='100%'
            m='0 auto'
            pt={{ base: '64px', lg: '80px' }}
            px={{ base: 4, md: 5, lg: '280px' }}
        >
            {children}
        </Box>
    );
}
