import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react';

export function HeaderProfile() {
    const avatar = '/src/shared/assets/mockData/avatar.png';
    const name = 'Екатерина Константинопольская';
    const login = '@bake_and_pie';
    return (
        <Box pr={6} flexShrink={0}>
            <Flex gap={3}>
                <Avatar
                    size='md'
                    src={avatar ? avatar : '/src/shared/assets/Avatar.jpg'}
                    name='avatar'
                />
                <VStack spacing={0} align='flex-start'>
                    <Text fontWeight={500} fontSize={18} lineHeight='156%' color='black'>
                        {name}
                    </Text>
                    <Text
                        fontWeight={400}
                        fontSize={14}
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.64)'
                    >
                        {login}
                    </Text>
                </VStack>
            </Flex>
        </Box>
    );
}
