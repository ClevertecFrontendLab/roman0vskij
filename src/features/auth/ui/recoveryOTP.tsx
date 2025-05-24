import {
    Box,
    Heading,
    Hide,
    HStack,
    IconButton,
    Image,
    PinInput,
    PinInputField,
    Show,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CrossIcon } from '~/shared/assets/icons';
import { AuthErrorAlert } from '~/shared/ui/alert/authErrorAlert';
import { BlurBg } from '~/shared/ui/blurBg';

type TProps = {
    handleCloseModal: () => void;
    email: string;
    handleSubmit: (data: string, email: string) => void;
    isError: boolean;
    error: FetchBaseQueryError | undefined;
};

export function RecoveryOTP({ handleCloseModal, email, handleSubmit, isError, error }: TProps) {
    const [isVisibleAlert, setAlertVisibility] = useState(false);

    useEffect(() => {
        if (!isVisibleAlert && isError) {
            setAlertVisibility(isError);
        }
    }, [isError]);

    const {
        register,
        formState: { errors },
    } = useForm({ mode: 'all' });

    const [showErrorText, setErrorText] = useState(false);

    useEffect(() => {
        if (!showErrorText && isError) {
            setErrorText(true);
        }
    }, [isError]);

    const [valueOTP, setValueOTP] = useState('');

    const onSubmit = (data: string) => {
        handleSubmit(data, email);
        setValueOTP('');
        //reset();

        // setValue('verification-code-input-1', '');
        // setValue('verification-code-input-3', 0);
        // setValue('verification-code-input-2', '');
        // setValue('verification-code-input-4', '');
        // setValue('verification-code-input-5', '');
        // setValue('verification-code-input-6', '');
        // setError('verification-code-input-1', { type: 'custom', message: '1' });
        // setError('verification-code-input-3', { type: 'custom', message: '2' });
        // setError('verification-code-input-2', { type: 'custom', message: '3' });
        // setError('verification-code-input-4', { type: 'custom', message: '4' });
        // setError('verification-code-input-5', { type: 'custom', message: '5' });
        // setError('verification-code-input-6', { type: 'custom', message: '6' });
    };

    return (
        <BlurBg>
            <VStack
                data-test-id='verification-code-modal'
                bg='#fff'
                borderRadius={16}
                p={8}
                pos='relative'
                gap={0}
                w={{ base: 316, lg: 396 }}
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
                    src='/src/shared/assets/OTP.jpg'
                    alt='otp image'
                    w={{ base: 108, lg: 206 }}
                    h={{ base: 108, lg: 206 }}
                />
                <Box mt={8} display='flex' flexDirection='column' gap={4}>
                    {showErrorText && (
                        <Heading
                            fontWeight={700}
                            fontSize={24}
                            lineHeight='133%'
                            color='#000'
                            mt={8}
                            textAlign='center'
                        >
                            Неверный код
                        </Heading>
                    )}
                    <Show above='lg'>
                        <Text
                            fontWeight={400}
                            fontSize={16}
                            lineHeight='150%'
                            color='rgba(0, 0, 0, 0.64)'
                            textAlign='center'
                        >
                            Мы отправили вам на e-mail
                            <br />
                            <b>{email}</b>
                            <br />
                            шестизначный код. Введите его ниже.
                        </Text>
                    </Show>
                    <Hide above='lg'>
                        <Text
                            fontWeight={400}
                            fontSize={16}
                            lineHeight='150%'
                            color='rgba(0, 0, 0, 0.64)'
                            textAlign='center'
                        >
                            Мы отправили вам на e-mail
                            <br />
                            <b>{email}</b>
                            <br />
                            шестизначный код.
                            <br />
                            Введите его ниже.
                        </Text>
                    </Hide>
                </Box>
                <form>
                    <HStack mt={4} gap={1.5}>
                        <PinInput
                            otp
                            onComplete={onSubmit}
                            value={valueOTP}
                            onChange={(e) => {
                                setValueOTP(e);
                            }}
                        >
                            <PinInputField
                                data-test-id='verification-code-input-1'
                                {...register('verification-code-input-1')}
                                borderColor={
                                    errors['verification-code-input-1']?.message
                                        ? 'red.500'
                                        : '#E2E8F0'
                                }
                            />
                            <PinInputField
                                data-test-id='verification-code-input-2'
                                {...register('verification-code-input-2')}
                                borderColor={
                                    errors['verification-code-input-2']?.message
                                        ? 'red.500'
                                        : '#E2E8F0'
                                }
                            />
                            <PinInputField
                                data-test-id='verification-code-input-3'
                                {...register('verification-code-input-3')}
                                borderColor={
                                    errors['verification-code-input-3']?.message
                                        ? 'red.500'
                                        : '#E2E8F0'
                                }
                            />
                            <PinInputField
                                data-test-id='verification-code-input-4'
                                {...register('verification-code-input-4')}
                                borderColor={
                                    errors['verification-code-input-4']?.message
                                        ? 'red.500'
                                        : '#E2E8F0'
                                }
                            />
                            <PinInputField
                                data-test-id='verification-code-input-5'
                                {...register('verification-code-input-5')}
                                borderColor={
                                    errors['verification-code-input-5']?.message
                                        ? 'red.500'
                                        : '#E2E8F0'
                                }
                            />
                            <PinInputField
                                data-test-id='verification-code-input-6'
                                {...register('verification-code-input-6')}
                                borderColor={
                                    errors['verification-code-input-6']?.message
                                        ? 'red.500'
                                        : '#E2E8F0'
                                }
                            />
                        </PinInput>
                    </HStack>
                </form>
                <Text
                    display={{ base: 'none', lg: 'block' }}
                    fontWeight={400}
                    fontSize={12}
                    lineHeight='133%'
                    color='rgba(0, 0, 0, 0.48)'
                    mt={6}
                    textAlign='center'
                >
                    Не пришло письмо? Проверьте папку Спам.
                </Text>
                <Text
                    display={{ base: 'block', lg: 'none' }}
                    fontWeight={400}
                    fontSize={12}
                    lineHeight='133%'
                    color='rgba(0, 0, 0, 0.48)'
                    mt={6}
                    textAlign='center'
                >
                    Не пришло письмо?
                    <br /> Проверьте папку Спам.
                </Text>
            </VStack>
            {isVisibleAlert && error && (
                <AuthErrorAlert
                    error={error}
                    handleCloseModal={() => {
                        setAlertVisibility(false);
                        setErrorText(false);
                    }}
                />
            )}
        </BlurBg>
    );
}
