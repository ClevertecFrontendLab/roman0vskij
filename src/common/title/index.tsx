import { Heading, Stack, Text } from '@chakra-ui/react';

type TProps = {
    title: string;
    text?: string;
    isForBlog?: boolean;
};

export function Title({ title, isForBlog = false, text = '' }: TProps) {
    return (
        <Stack justify='space-between' direction={{ base: 'column', lg: 'row' }}>
            <Heading
                fontWeight={isForBlog ? { base: 500, xl: 400 } : 500}
                fontSize={isForBlog ? { base: 24, lg: 30, xl: 36 } : { base: 24, lg: 36, xl: 48 }}
                lineHeight={
                    isForBlog
                        ? { base: '133%', lg: '120%', xl: '111%' }
                        : { base: '133%', lg: '111%', xl: '100%' }
                }
                color='#000'
                w='fit-content'
            >
                {title}
            </Heading>
            {text && (
                <Text
                    fontSize={{ base: 14, lg: 16 }}
                    fontWeight={500}
                    lineHeight={{ base: '143%', lg: '150%' }}
                    textAlign='center'
                    color='rgba(0, 0, 0, 0.64)'
                >
                    {text}
                </Text>
            )}
        </Stack>
    );
}
