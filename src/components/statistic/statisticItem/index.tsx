import { HStack, Image, Text } from '@chakra-ui/react';

type Props = {
    img: string;
    value: number;
};

export default function StatisticItem({ img, value }: Props) {
    return (
        <HStack
            h={[6, null, null, 10]}
            w='fit-content'
            px={[2, null, null, 4]}
            py={[1, null, null, 2]}
            gap={{ base: 1.5, lg: 2 }}
        >
            <Image
                w={[3, null, null, 4]}
                h={[3, null, null, 4]}
                src={`/src/assets/${img}.svg`}
                alt={`${img}`}
            />
            <Text
                color='#2db100'
                fontSize={[12, null, null, 16]}
                fontWeight={600}
                lineHeight={['16px', null, null, '24px']}
            >
                {value}
            </Text>
        </HStack>
    );
}
