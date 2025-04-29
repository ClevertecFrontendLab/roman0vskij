import { Box } from '@chakra-ui/react';

type TProps = {
    text: string;
};

export function Allergen({ text }: TProps) {
    return (
        <Box
            borderRadius={6}
            border='1px solid #b1ff2e'
            py={0.5}
            px={2}
            fontWeight={500}
            fontSize={12}
            lineHeight='133%'
            color='#2db100'
            w='fit-content'
        >
            {text}
        </Box>
    );
}
