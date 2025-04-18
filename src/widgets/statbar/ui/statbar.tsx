import { Flex, VStack } from '@chakra-ui/react';

import { NoteButton } from '~/shared/ui/noteButton';
import { Statistic } from '~/shared/ui/statistic';

export function Statbar() {
    return (
        <VStack
            display={{ base: 'none', lg: 'flex' }}
            as='aside'
            right={0}
            pos='fixed'
            w={256}
            h='100%'
            pt={20}
            justify='space-between'
            align='flex-end'
            gap={0}
        >
            <Flex w={208} justify='flex-end' pr={14}>
                <Statistic />
            </Flex>
            <NoteButton />
        </VStack>
    );
}
