import { HStack, IconButton, Image, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { SearchIcon } from '~/shared/assets/icons';

export function Search() {
    return (
        <HStack
            maxW={{ base: 480, lg: 550 }}
            w='100%'
            h={{ base: 8, lg: 12 }}
            gap={3}
            px={4}
            justifySelf='center'
        >
            <IconButton
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
            <InputGroup _hover={{ border: 'none', boxShadow: 'none' }}>
                <Input
                    variant='colorful'
                    placeholder='Название или ингредиент...'
                    py={{ base: 7.5, lg: 3.25 }}
                    pl={{ base: 3, lg: 4 }}
                    pr={{ base: 8, lg: 12 }}
                    h={{ base: 8, lg: 12 }}
                    w='100%'
                />
                <InputRightElement h={{ base: 8, lg: 12 }} w={{ base: 8, lg: 12 }}>
                    <IconButton
                        icon={<SearchIcon h={{ base: 3.5, lg: 18 }} w={{ base: 3.5, lg: 18 }} />}
                        aria-label='search button'
                        h={{ base: 8, lg: 12 }}
                        w={{ base: 8, lg: 12 }}
                        background='transparent'
                        _hover={{ background: 'transparent' }}
                    />
                </InputRightElement>
            </InputGroup>
        </HStack>
    );
}
