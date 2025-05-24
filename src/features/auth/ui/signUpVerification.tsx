import { Heading, IconButton, Image, Text, VStack } from '@chakra-ui/react';

import { CrossIcon } from '~/shared/assets/icons';

import { BlurBg } from '../../../shared/ui/blurBg';

type TProps = {
    handleCloseModal: () => void;
    email: string;
};

export function SignUpVerification({ handleCloseModal, email }: TProps) {
    return (
        <BlurBg>
            <VStack
                data-test-id='sign-up-success-modal'
                bg='#fff'
                borderRadius={16}
                p={8}
                pos='relative'
                gap={0}
                w={{ base: 316, lg: 396 }}
                h={{ base: 516, lg: 550 }}
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
                    src='/src/shared/assets/signUpVerification.jpg'
                    alt='sign-up-verification image'
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
                    Остался последний шаг. Нужно верифицировать ваш e-mail
                </Heading>
                <Text
                    fontWeight={400}
                    fontSize={16}
                    lineHeight='150%'
                    color='rgba(0, 0, 0, 0.64)'
                    mt={4}
                    textAlign='center'
                >
                    Мы отправили вам на почту
                    <br />
                    <b>{email}</b>
                    <br />
                    ссылку для верификации.
                </Text>
                <Text
                    display={{ base: 'none', lg: 'block' }}
                    fontWeight={400}
                    fontSize={12}
                    lineHeight='133%'
                    color='rgba(0, 0, 0, 0.48)'
                    mt={8}
                    textAlign='center'
                >
                    Не пришло письмо? Проверьте папку Спам.
                    <br />
                    По другим вопросам свяжитесь <u>с поддержкой</u>
                </Text>
                <Text
                    display={{ base: 'block', lg: 'none' }}
                    fontWeight={400}
                    fontSize={12}
                    lineHeight='133%'
                    color='rgba(0, 0, 0, 0.48)'
                    mt={8}
                    textAlign='center'
                >
                    Не пришло письмо? <br />
                    Проверьте папку Спам.
                    <br />
                    По другим вопросам свяжитесь
                    <br /> <u>с поддержкой</u>
                </Text>
            </VStack>
        </BlurBg>
    );
}
