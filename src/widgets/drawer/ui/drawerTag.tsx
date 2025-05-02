import { Box } from '@chakra-ui/react';

import { CrossIcon } from '~/shared/assets/icons';

type TProps = {
    text: string;
};

export function DrawerTag({ text }: TProps) {
    return (
        <Box
            borderRadius={6}
            border='1px solid #b1ff2e'
            py={0.5}
            px={2}
            fontWeight={500}
            fontSize={14}
            lineHeight='143%'
            color='#207e00'
            w='fit-content'
            bg='#eaffc7'
            display='flex'
            gap={2}
            alignItems='center'
        >
            {text}
            <CrossIcon w={2.5} h={2.5} fill='#207e00' opacity={0.5} />
        </Box>
    );
}
