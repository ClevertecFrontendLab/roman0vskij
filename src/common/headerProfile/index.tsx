import { Avatar, Box, Flex, Hide, Text, VStack } from '@chakra-ui/react';

export default function HeaderProfile() {
    return (
        <Box pr={6}>
            <Flex gap={3}>
                <Avatar size='md' src='/src/assets/avatar.png' name='avatar' />
                <VStack spacing={0} align='flex-start'>
                    <Text fontWeight={500} fontSize={18} lineHeight='156%' color='black'>
                        Екатерина Константинопольская
                    </Text>
                    <Text
                        fontWeight={400}
                        fontSize={14}
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.64)'
                    >
                        @bake_and_pie
                    </Text>
                </VStack>
                <Hide above='lg'>Мой профиль</Hide>
            </Flex>
        </Box>
    );
}
