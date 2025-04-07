import { Box, Button, Image, Text } from '@chakra-ui/react';

type Props = {
    img: string;
    value: number;
};

export default function StatisticButton({ img, value }: Props) {
    return (
        <Button
            variant='none'
            h={[6, null, null, 10]}
            w='fit-content'
            px={[2, null, null, 4]}
            py={[1, null, null, 2]}
        >
            <Image
                w={[3, null, null, 4]}
                h={[3, null, null, 4]}
                src={`/${img}.svg`}
                alt={`${img}`}
            />
            <Box w={[1.5, null, null, 2]} />
            <Text
                color='#2db100'
                fontSize={[12, null, null, 16]}
                fontWeight={600}
                lineHeight={['16px', null, null, '24px']}
            >
                {value}
            </Text>
        </Button>
    );
}
