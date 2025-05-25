import { Button, Heading, IconButton, Image, Text, VStack } from '@chakra-ui/react';

import { CrossIcon } from '~/shared/assets/icons';
import { BlurBg } from '~/shared/ui/blurBg';

type TProps = {
    handleClick: () => void;
    handleCloseModal: () => void;
};

export function SignInError({ handleClick, handleCloseModal }: TProps) {
    return (
        <BlurBg>
            <VStack
                data-test-id='sign-in-error-modal'
                bg='#fff'
                borderRadius={16}
                p={8}
                pos='relative'
                gap={0}
                w={{ base: 316, lg: 396 }}
                h={{ base: 380, lg: 478 }}
            >
                <IconButton
                    data-test-id='close-button'
                    onClick={handleCloseModal}
                    icon={<CrossIcon />}
                    aria-label='close-modal button'
                    pos='absolute'
                    top={6}
                    right={6}
                    bgColor='transparent'
                    borderRadius={9999}
                    border='1px solid #000'
                    w={6}
                    minW={0}
                    h={6}
                    p={0}
                    _hover={{ bgColor: 'transparent' }}
                />
                <Image
                    src='/src/shared/assets/signInError.jpg'
                    alt='sign-in-error image'
                    w={{ base: 108, lg: 206 }}
                    h={{ base: 108, lg: 206 }}
                />
                <Heading
                    fontWeight={700}
                    fontSize={24}
                    lineHeight='133%'
                    color='#000'
                    mt={8}
                    textAlign='center'
                >
                    Вход не выполнен
                </Heading>
                <Text
                    fontWeight={400}
                    fontSize={16}
                    lineHeight='150%'
                    color='rgba(0, 0, 0, 0.64)'
                    mt={4}
                    textAlign='center'
                >
                    Что-то пошло не так.
                    <br /> Попробуйте еще раз
                </Text>
                <Button
                    data-test-id='repeat-button'
                    onClick={handleClick}
                    variant='black'
                    mt={8}
                    w='100%'
                    h={12}
                >
                    Повторить
                </Button>
            </VStack>
        </BlurBg>
    );
}
