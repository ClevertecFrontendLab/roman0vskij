import { Flex, Text } from '@chakra-ui/react';

type TProps = {
    text: string;
    value: number;
    unit: string;
};

export function Macronutrient({ text, value, unit }: TProps) {
    return (
        <Flex
            key={`macronutrient-${text}`}
            direction={{ base: 'row', md: 'column' }}
            h={{ base: '64px', md: '136px' }}
            maxW={{ base: 328, md: 'auto' }}
            w='100%'
            gap={{ base: 1, md: 3 }}
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius={16}
            py={4}
            px={{ base: 3, md: 4 }}
        >
            <Text
                display='flex'
                alignItems='center'
                fontWeight={400}
                fontSize={14}
                lineHeight='143%'
                color='rgba(0, 0, 0, 0.48)'
                w={{ base: '117.5px', md: '100%' }}
                justifyContent={{ md: 'center' }}
            >
                {text}
            </Text>
            <Text
                display='flex'
                alignItems='center'
                fontWeight={500}
                fontSize={{ base: 24, md: 36 }}
                lineHeight={{ base: '133%', md: '111%' }}
                color='#134b00'
                w={{ base: '117.5px', md: '100%' }}
                justifyContent='center'
            >
                {value}
            </Text>
            <Text
                display='flex'
                alignItems='center'
                fontWeight={600}
                fontSize={{ base: 12, md: 14 }}
                lineHeight={{ base: '133%', md: '143%' }}
                color='rgba(0, 0, 0, 0.92)'
                w={{ base: '61px', md: '100%' }}
                justifyContent={{ md: 'center' }}
            >
                {unit}
            </Text>
        </Flex>
    );
}
