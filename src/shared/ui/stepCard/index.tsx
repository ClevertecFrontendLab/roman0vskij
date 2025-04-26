import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';

import { TStep } from '~/shared/mock/mockType';

type TProps = TStep & { last?: boolean };

export function StepCard({ description, image, stepNumber, last = false }: TProps) {
    return (
        <Flex
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius={8}
            w='100%'
            maxH={{ base: 128, lg: 244 }}
            h='100%'
            overflow='hidden'
        >
            {image && (
                <Image
                    src={image}
                    alt={`step${stepNumber}`}
                    maxW={{ base: 158, lg: 346 }}
                    objectFit='cover'
                />
            )}
            <VStack
                align='flex-start'
                pt={{ base: 2, lg: 5 }}
                px={{ base: 2, lg: 6 }}
                pb={{ base: 1, lg: 5 }}
            >
                <Box
                    borderRadius={4}
                    backgroundColor={last ? '#ffffd3' : 'rgba(0, 0, 0, 0.06)'}
                    px={2}
                    py={0.5}
                    fontWeight={400}
                    fontSize={14}
                    lineHeight='143%'
                    color='#000'
                >{`Шаг ${stepNumber}`}</Box>
                <Text
                    fontWeight={400}
                    fontSize={14}
                    lineHeight='143%'
                    color='#000'
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 'auto',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {description}
                </Text>
            </VStack>
        </Flex>
    );
}
