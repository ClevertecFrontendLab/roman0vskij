import { IconButton, Image } from '@chakra-ui/react';

type TProps = {
    onclick: () => void;
};

export function DrawerButton({ onclick }: TProps) {
    return (
        <IconButton
            data-test-id='filter-button'
            onClick={onclick}
            minW={{ base: 8, lg: 12 }}
            minH={{ base: 8, lg: 12 }}
            w={{ base: 8, lg: 12 }}
            h={{ base: 8, lg: 12 }}
            aria-label='button near search'
            icon={
                <Image
                    w={{ base: 3.5, lg: 6 }}
                    h={{ base: 3.5, lg: 6 }}
                    src='/src/shared/assets/buttonNearSearch.svg'
                    alt='near search icon'
                />
            }
            bg='none'
            border='1px solid rgba(0, 0, 0, 0.48)'
            borderRadius={6}
            p={0}
        />
    );
}
