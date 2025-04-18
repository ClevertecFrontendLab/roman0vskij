import { Flex, VStack } from '@chakra-ui/react';

import NoteButton from '~/common/noteButton';

import Statistic from '../statistic';

export default function Statbar() {
    return (
        <VStack
            display={{ base: 'none', lg: 'block' }}
            as='aside'
            right={0}
            pos='fixed'
            w={256}
            h='100%'
            pt={20}
            justify='space-between'
            align='flex-end'
        >
            <Flex w={208} h='100%' justify='flex-end' pr={14}>
                <Statistic />
            </Flex>
            <NoteButton />
        </VStack>
    );
}
