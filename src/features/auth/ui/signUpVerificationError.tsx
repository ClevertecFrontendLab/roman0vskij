import { Heading, IconButton, Image, Text, VStack } from '@chakra-ui/react';

import { CrossIcon } from '~/shared/assets/icons';

import { BlurBg } from '../../../shared/ui/blurBg';

type TProps = {
    handleCloseModal: () => void;
};

export function SignUpVerificationError({ handleCloseModal }: TProps) {
    return (
        <BlurBg>
            <VStack
                data-test-id='email-verification-failed-modal'
                bg='#fff'
                borderRadius={16}
                p={8}
                pos='relative'
                gap={0}
                w={{ base: 316, lg: 396 }}
                h={{ base: 420, lg: 470 }}
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
                    src='/src/shared/assets/signUpVerificationError.jpg'
                    alt='sign-up-verification-error image'
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
                    Упс! Что-то пошло не так
                </Heading>
                <Text
                    fontWeight={400}
                    fontSize={16}
                    lineHeight='150%'
                    color='rgba(0, 0, 0, 0.64)'
                    mt={4}
                    textAlign='center'
                >
                    Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться
                    снова.
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
                    Остались вопросы? Свяжитесь <u>с поддержкой</u>
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
                    Остались вопросы? Свяжитесь
                    <br /> <u>с поддержкой</u>
                </Text>
            </VStack>
        </BlurBg>
    );
}
