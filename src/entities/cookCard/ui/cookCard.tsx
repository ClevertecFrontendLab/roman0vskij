import { Button, Flex, HStack, Image, Text } from '@chakra-ui/react';

import { selectCategories } from '~/entities/category';
import { TRecipe } from '~/entities/recipe';
import { ApiBaseURL } from '~/query/constants/base';
import { useAppSelector } from '~/store/hooks';

export function CookCard({ title, categoriesIds }: TRecipe) {
    const categories = useAppSelector(selectCategories);

    return (
        <HStack
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius={8}
            align='center'
            px={{ base: 3, xl: 6 }}
            py={{ base: 3, lg: 2.5, xl: 3 }}
            w='100%'
            h='100%'
            maxH={{ base: '48px', lg: '52px', xl: '56px' }}
            justify='space-between'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
        >
            <Flex gap={{ base: 2, xl: 3 }} wrap='nowrap'>
                <Image
                    src={
                        ApiBaseURL.IMG_URL +
                        categories.find((category) =>
                            category.subCategories.find((e) => e._id === categoriesIds[0]),
                        )?.icon
                    }
                    alt='category icon'
                />
                <Text
                    wordBreak='break-all'
                    noOfLines={1}
                    color='#000'
                    fontWeight={500}
                    fontSize={{ base: 16, lg: 18, xl: 20 }}
                    lineHeight={{ base: '150%', lg: '156%', xl: '140%' }}
                >
                    {title}
                </Text>
            </Flex>
            <Button
                variant='none'
                w={{ base: 70, xl: 87 }}
                h={{ base: 6, lg: 8 }}
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
