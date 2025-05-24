import { Box, HStack, Show } from '@chakra-ui/react';

import { LogoIcon, LogoTitleIcon } from '~/shared/assets/icons';

type TProps = {
    variant: 'header' | 'form';
};

export function Logo({ variant }: TProps) {
    return variant === 'header' ? (
        <Box h={8} minW={{ md: '135px' }} mr={[3, null, null, 32]}>
            <HStack spacing='6.98px' align='flex-end' w='100%'>
                <LogoIcon w='33px' h='32px' />
                <Show above='md'>
                    <LogoTitleIcon w='97px' h='26px' mb='1.21px' />
                </Show>
            </HStack>
        </Box>
    ) : variant === 'form' ? (
        <Box w='fit-content'>
            <HStack spacing={{ base: '8.15px', lg: '13.98px' }} align='flex-end' w='100%'>
                <LogoIcon w={{ base: '38px', lg: '65px' }} h={{ base: '38px', lg: '64px' }} />
                <LogoTitleIcon
                    w={{ base: '113px', lg: '193px' }}
                    h={{ base: '30px', lg: '51px' }}
                    mb={{ base: '1.44px', lg: '2.42px' }}
                />
            </HStack>
        </Box>
    ) : (
        <></>
    );
}
