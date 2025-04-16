import { Button, Image } from '@chakra-ui/react';

type TProps = {
    text: string;
    hasArrow?: boolean;
    bgColor?: string;
    onClick?: () => void;
    showOnLg?: boolean;
    hideOnLg?: boolean;
};

export function GreenButton({
    onClick,
    text,
    hasArrow = false,
    bgColor = '',
    showOnLg = false,
    hideOnLg = false,
    ...rest
}: TProps) {
    return (
        <Button
            display={
                showOnLg
                    ? { base: 'none', lg: 'flex' }
                    : hideOnLg
                      ? { base: 'flex', lg: 'none' }
                      : { base: 'flex' }
            }
            onClick={onClick}
            rightIcon={hasArrow ? <Image src='/src/assets/arrowRight.svg' /> : undefined}
            bgColor={bgColor ? bgColor : '#b1ff2e'}
            py={hasArrow ? { base: 2, xl: 2.5 } : 2}
            px={hasArrow ? { base: 4, xl: 6 } : 4}
            borderRadius={6}
            fontWeight={600}
            fontSize={{ base: 16, xl: 18 }}
            lineHeight={{ base: '150%', xl: '156%' }}
            color='#000'
            _hover={{ bgColor: 'none' }}
            _active={{ bgColor: 'none' }}
            {...rest}
        >
            {text}
        </Button>
    );
}
