import { Box, HStack, Image, Text } from '@chakra-ui/react';

type TProps = {
    isRelevant?: boolean;
    bgClr: string;
    title: string;
    img: string;
};

export function Tag(props: TProps) {
    return (
        <Box
            bgColor={props.bgClr}
            w='fit-content'
            px={props.isRelevant ? 2 : { base: 1, lg: 2 }}
            py={0.5}
            borderRadius={4}
            h={6}
        >
            <HStack spacing={props.isRelevant ? 2 : { base: 0.5, lg: 2 }}>
                <Image h={4} w={4} src={props?.img} />
                <Text
                    fontSize={14}
                    fontWeight={400}
                    lineHeight='143%'
                    color='#000'
                    wordBreak='break-all'
                    noOfLines={1}
                >
                    {props?.title}
                </Text>
            </HStack>
        </Box>
    );
}
