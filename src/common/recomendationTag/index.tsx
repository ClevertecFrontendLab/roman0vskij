import { Avatar, Box, HStack, Text } from '@chakra-ui/react';

type TProps = {
    userImg: string;
    userName: string;
    bgClr: string;
};
export function RecomendationTag({ userImg, userName, bgClr }: TProps) {
    return (
        <Box bgColor={bgClr} w='fit-content' px={2} py={1} borderRadius={4} h={7}>
            <HStack spacing={2}>
                <Avatar h={4} w={4} src={userImg ? userImg : '/src/assets/Avatar.jpg'} />
                <Text fontSize={14} fontWeight={400} lineHeight='143%' color='#000'>
                    {userName + ' рекомендует'}
                </Text>
            </HStack>
        </Box>
    );
}
