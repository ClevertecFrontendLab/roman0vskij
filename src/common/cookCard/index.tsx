import { Button, Flex, HStack, Image, Text } from '@chakra-ui/react';

import { TCookCard } from '~/shared/mock/mockCookCards';

export default function CookCard({ text, img }: TCookCard) {
    return (
        <HStack
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius={8}
            align='center'
            px={{ base: 3, xl: 6 }}
            py={{ base: 2.5, xl: 3 }}
            w='100%'
            h='100%'
            maxH={{ base: '52px', xl: '56px' }}
            justify='space-between'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
        >
            <Flex gap={{ base: 2, xl: 3 }} wrap='nowrap'>
                <Image src={img} alt='img' />
                <Text
                    wordBreak='break-all'
                    noOfLines={1}
                    color='#000'
                    fontWeight={500}
                    fontSize={{ base: 16, lg: 18, xl: 20 }}
                    lineHeight={{ base: '150%', lg: '156%', xl: '140%' }}
                >
                    {text}
                </Text>
            </Flex>
            <Button
                variant='none'
                w={{ base: 70, xl: 87 }}
                h={8}
                border='1px solid #2db100'
                borderRadius={6}
                p={{ base: 2, xl: '6px 12px' }}
                fontWeight={600}
                fontSize={{ base: 12, xl: 14 }}
                lineHeight={{ base: '133%', xl: '143%' }}
                color='#2db100'
                flexShrink={0}
            >
                Готовить
            </Button>
        </HStack>
    );
}
