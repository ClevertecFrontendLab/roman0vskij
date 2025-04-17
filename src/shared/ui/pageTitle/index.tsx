import { Heading, Text, VStack } from '@chakra-ui/react';

type TProps = {
    title: string;
    subTitle?: string;
};

export function PageTitle({ title, subTitle = '' }: TProps) {
    return (
        <VStack
            justify='center'
            my={{ base: 4, lg: 8 }}
            gap={{ base: 4, lg: 3 }}
            ml={{ base: 4, lg: 5.25, xl: 23 }}
            mr={{ base: 4, lg: 5, xl: 23 }}
        >
            <Heading
                as='h1'
                fontSize={{ base: 24, lg: 48 }}
                fontWeight={700}
                lineHeight={{ base: '133%', lg: '100%' }}
                textAlign='center'
                color='#000'
            >
                {title}
            </Heading>
            {subTitle && (
                <Text
                    fontSize={{ base: 14, lg: 16 }}
                    fontWeight={500}
                    lineHeight={{ base: '143%', lg: '150%' }}
                    textAlign='center'
                    color='rgba(0, 0, 0, 0.48)'
                    maxW={{ base: 727, lg: 696 }}
                >
                    {subTitle}
                </Text>
            )}
        </VStack>
    );
}
