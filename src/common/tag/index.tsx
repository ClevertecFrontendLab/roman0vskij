import { Box, HStack, Image, Text } from '@chakra-ui/react';

type TProps = {
    img: string;
    tagName: string;
    bgClr: string;
};

export default function Tag({ img, tagName, bgClr }: TProps) {
    return (
        <Box
            bgColor={bgClr}
            w='fit-content'
            px={{ base: 1, lg: 2 }}
            py={0.5}
            borderRadius={4}
            h={6}
        >
            <HStack spacing={{ base: 0.5, lg: 2 }}>
                <Image h={4} w={4} src={`${img}`} />
                <Text fontSize={14} fontWeight={400} lineHeight='143%' color='#000'>
                    {tagName}
                </Text>
            </HStack>
        </Box>
    );
}
