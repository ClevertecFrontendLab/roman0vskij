import { HStack, Image, Text } from '@chakra-ui/react';

type TProps = {
    saves: number;
    smiles: number;
};

export default function CardStatistic({ saves, smiles }: TProps) {
    return (
        <HStack h={6} gap={2}>
            {saves > 0 && (
                <HStack gap={1.5} p={1}>
                    <Image src='/src/assets/save.svg' alt='save' />
                    <Text fontSize={12} fontWeight={600} lineHeight='133%' color='#2db100'>
                        {saves}
                    </Text>
                </HStack>
            )}
            {smiles > 0 && (
                <HStack gap={1.5} p={1}>
                    <Image src='/src/assets/smile.svg' alt='smile' />
                    <Text fontSize={12} fontWeight={600} lineHeight='133%' color='#2db100'>
                        {smiles}
                    </Text>
                </HStack>
            )}
        </HStack>
    );
}
