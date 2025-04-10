import { Button, Image } from '@chakra-ui/react';

type TProps = {
    text: string;
    hasArrow?: boolean;
};

export default function GreenButton({ text, hasArrow = false }: TProps) {
    return (
        <Button
            rightIcon={hasArrow ? <Image src='/src/assets/arrowRight.svg' /> : undefined}
            bgColor='#b1ff2e'
            py={hasArrow ? { base: 2, xl: 2.5 } : 2}
            px={hasArrow ? { base: 4, xl: 6 } : 4}
            borderRadius={6}
            fontWeight={600}
            fontSize={{ base: 16, xl: 18 }}
            lineHeight={{ base: '150%', xl: '156%' }}
            color='#000'
            _hover={{ bgColor: 'none' }}
            _active={{ bgColor: 'none' }}
        >
            {text}
        </Button>
    );
}
