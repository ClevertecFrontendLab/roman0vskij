import { Avatar, Card, CardBody, CardHeader, Heading, Text, VStack } from '@chakra-ui/react';

import { TBlogCard } from '..';

export function BlogCard({ text, userName, userLogin, userImg }: TBlogCard) {
    return (
        <Card
            w='100%'
            h='fit-content'
            minH={{ base: 152, lg: 160, xl: 184 }}
            borderRadius={8}
            bgColor='#fff'
            overflow='hidden'
            border='1px solid rgba(0, 0, 0, 0.08)'
            variant='none'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
        >
            <CardHeader
                display='flex'
                flexDirection='row'
                alignItems='center'
                px={{ base: 4, xl: 6 }}
                pt={{ base: 4, xl: 6 }}
                pb={{ base: 2, xl: 4 }}
                maxH={{ base: 64, lg: 72, xl: 88 }}
                gap={{ base: 2, lg: 3 }}
            >
                <Avatar
                    h={{ base: 8, lg: 12 }}
                    w={{ base: 8, lg: 12 }}
                    objectFit='cover'
                    src={userImg}
                />
                <VStack spacing={0} align='flex-start'>
                    <Heading
                        fontSize={{ base: 16, lg: 18 }}
                        fontWeight={500}
                        lineHeight={{ base: '150%', lg: '156%' }}
                        color='#000'
                        wordBreak='break-all'
                        noOfLines={1}
                    >
                        {userName}
                    </Heading>
                    <Text
                        fontSize={{ base: 12, lg: 14 }}
                        fontWeight={400}
                        lineHeight={{ base: '133%', lg: '143%' }}
                        color=' rgba(0, 0, 0, 0.64)'
                        wordBreak='break-all'
                        noOfLines={1}
                    >
                        {userLogin}
                    </Text>
                </VStack>
            </CardHeader>
            <CardBody px={{ base: 4, xl: 6 }} pt={2} pb={4} maxH={64}>
                <Text
                    fontWeight={400}
                    fontSize={14}
                    lineHeight='143%'
                    color='#000'
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {text}
                </Text>
            </CardBody>
        </Card>
    );
}
