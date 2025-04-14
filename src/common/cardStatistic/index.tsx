import { HStack, Text } from '@chakra-ui/react';

import { SaveIcon, SmileIcon } from '~/assets/icons';

type TProps = {
    saves: number;
    smiles: number;
};

export default function CardStatistic({ saves, smiles }: TProps) {
    return (
        <HStack h={6} gap={2}>
            {saves > 0 && (
                <HStack gap={1.5} p={1}>
                    <SaveIcon />
                    <Text fontSize={12} fontWeight={600} lineHeight='133%' color='#2db100'>
                        {saves}
                    </Text>
                </HStack>
            )}
            {smiles > 0 && (
                <HStack gap={1.5} p={1}>
                    <SmileIcon />
                    <Text fontSize={12} fontWeight={600} lineHeight='133%' color='#2db100'>
                        {smiles}
                    </Text>
                </HStack>
            )}
        </HStack>
    );
}
