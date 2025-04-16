import { IconButton, Text, VStack } from '@chakra-ui/react';

import { NoteIcon } from '~/assets/icons';

export function NoteButton() {
    return (
        <VStack
            w='100%'
            h='100%'
            maxH={208}
            maxW={208}
            bgGradient=' radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 45%) 0%, rgba(255, 255, 255, 0) 100%)'
            flexDir='column'
            pt={20}
            spacing={3}
        >
            <IconButton
                variant='none'
                isRound
                bgColor='#000'
                w={12}
                h={12}
                aria-label='note button'
                icon={<NoteIcon fill='#ffffd3' />}
            />
            <Text
                fontWeight={400}
                fontSize={12}
                lineHeight='133%'
                textAlign='center'
                color='rgba(0, 0, 0, 0.64)'
            >
                Записать рецепт
            </Text>
        </VStack>
    );
}
