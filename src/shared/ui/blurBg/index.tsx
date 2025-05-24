import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

type TProps = {
    children?: ReactNode;
    zIndex?: number;
};

export function BlurBg({ children, zIndex, ...props }: TProps) {
    return (
        <Box
            {...props}
            top={0}
            left={0}
            position='fixed'
            background='rgba(0, 0, 0, 0.16)'
            backdropFilter='blur(2px)'
            w='100%'
            height='100%'
            zIndex={zIndex ?? 20}
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            {children}
        </Box>
    );
}
