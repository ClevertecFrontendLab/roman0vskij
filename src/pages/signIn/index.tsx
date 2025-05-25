import { Box, Button, Flex, HStack, Tab, TabList, Tabs, Text, VStack } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import { RecoveryCheckEmailForm, RecoveryForm, RecoveryOTP, SignInError } from '~/features/auth';
import {
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useSignInMutation,
    useVerifyOTPMutation,
} from '~/query/services/auth';
import { AuthErrorAlert } from '~/shared/ui/alert/authErrorAlert';
import { AuthSuccessAlert } from '~/shared/ui/alert/authSuccessAlert';
import { FormInput } from '~/shared/ui/formInput';
import { Loader } from '~/shared/ui/loader';
import { Logo } from '~/shared/ui/logo';

type TForm = {
    login: string;
    password: string;
};

export function SignIn() {
    const navigate = useNavigate();
    const [isModalVisible, setModalVisibility] = useState(false);
    const [alertError, setAlertError] = useState<FetchBaseQueryError | null>(null);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const emailVerified = params.get('emailVerified');
    const [isVisibleSuccessAlert, setVisibleSuccessAlert] = useState<{
        title: string;
        message?: string;
    } | null>(null);

    useEffect(() => {
        if (emailVerified === 'true' && !isVisibleSuccessAlert) {
            setVisibleSuccessAlert({ title: 'Верификация прошла успешно' });
        }
    }, [emailVerified]);

    const handleClick = () => navigate('/sign-up');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        getValues,
    } = useForm();

    const handleTrimOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const { name, value } = e.target;
        setValue(name, value.trim());
    };

    const [signIn, { isLoading, isSuccess, isError, error }] = useSignInMutation();

    const onSubmit = (data: TForm) => {
        signIn(data);
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/', { replace: true });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError && 'status' in error) {
            if (!isModalVisible && typeof error.status === 'number' && error.status / 100 === 5) {
                setModalVisibility(true);
            } else if (error.status === 401) {
                setError('login', { type: 'custom', message: '' });
                setError('password', { type: 'custom', message: '' });
                setAlertError(error);
            } else {
                setAlertError(error);
            }
        }
    }, [isError, error]);

    const handleCloseSuccessAlert = () => {
        setVisibleSuccessAlert(null);
    };

    const handleCloseErrorAlert = () => {
        setAlertError(null);
    };

    const handleModalClick = () => {
        onSubmit(getValues() as TForm);
    };

    const handleCloseModal = () => {
        setModalVisibility(false);
    };

    //! Recovery flow
    const [isVisibleCheckEmailForm, setVisibilityCheckEmailForm] = useState(false);

    const handleToggleCheckEmailForm = () => {
        setVisibilityCheckEmailForm((prev) => !prev);
    };

    const [
        checkEmail,
        {
            isLoading: isCheckEmailLoading,
            isError: isCheckEmailError,
            isSuccess: isCheckEmailSuccess,
            originalArgs,
            error: checkEmailError,
        },
    ] = useForgotPasswordMutation();

    const handleClickCheckEmail = (data: FieldValues) => {
        checkEmail(data);
    };

    const [isVisibleOTP, setOTPVisibility] = useState(false);

    useEffect(() => {
        if (!isVisibleOTP && isCheckEmailSuccess) {
            setVisibilityCheckEmailForm(false);
            setOTPVisibility(true);
        }
    }, [isCheckEmailSuccess]);

    const [
        verifyOTP,
        {
            isLoading: isVerifyOTPLoading,
            isError: isVerifyOTPError,
            isSuccess: isVerifyOTPSuccess,
            error: verifyOTPError,
        },
    ] = useVerifyOTPMutation();

    const handleClickVerifyOTP = (data: string, email: string) => {
        verifyOTP({ email: email, otpToken: data });
    };

    const [isVisibleRecoveryForm, setRecoveryFormVisibility] = useState(false);

    useEffect(() => {
        if (!isVisibleRecoveryForm && isVerifyOTPSuccess) {
            setOTPVisibility(false);
            setRecoveryFormVisibility(true);
        }
    }, [isVerifyOTPSuccess]);

    const [
        resetPassword,
        {
            isLoading: isResetLoading,
            isError: isResetError,
            isSuccess: isResetSuccess,
            error: resetError,
        },
    ] = useResetPasswordMutation();

    const handleClickReset = (data: FieldValues) => {
        resetPassword({ email: originalArgs?.email, ...data });
    };

    useEffect(() => {
        if (isVisibleRecoveryForm && isResetSuccess) {
            setRecoveryFormVisibility(false);
            setVisibleSuccessAlert({ title: 'Восстановление данных успешно' });
        }
    }, [isResetSuccess]);

    return (
        <HStack h='100vh' gap={0} bg='linear-gradient(208deg, #eaffc7 0%, #29813f 100%)'>
            <VStack flex='1 1 50%' h='100%' p={{ base: 4, md: 30 }} pos='relative' gap={0}>
                <VStack w='100%' maxW={461} gap={0}>
                    <Logo variant='form' />

                    <Tabs
                        defaultIndex={0}
                        variant='form'
                        mt={{ base: 10, md: 14, lg: 20 }}
                        w='100%'
                    >
                        <Box>
                            <TabList>
                                <Tab key='sign-in'>Вход на сайт</Tab>
                                <Tab key='sign-up' onClick={handleClick}>
                                    Регистрация
                                </Tab>
                            </TabList>
                        </Box>
                    </Tabs>

                    <form
                        data-test-id='sign-in-form'
                        onSubmit={handleSubmit((data) => onSubmit(data as TForm))}
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            marginTop: '40px',
                        }}
                    >
                        <FormInput
                            data-test-id='login-input'
                            name='login'
                            register={register}
                            rules={{
                                required: 'Введите логин',
                                maxLength: {
                                    value: 50,
                                    message: 'Максимальная длина 50 символов',
                                },
                            }}
                            errors={errors}
                            handleTrimOnBlur={handleTrimOnBlur}
                            placeholder='Введите логин'
                            label='Логин для входа на сайт'
                        />
                        <FormInput
                            data-test-id='password-input'
                            name='password'
                            register={register}
                            rules={{
                                required: 'Введите пароль',
                                maxLength: {
                                    value: 50,
                                    message: 'Максимальная длина 50 символов',
                                },
                            }}
                            errors={errors}
                            placeholder='Пароль для сайта'
                            label='Пароль'
                            type='password'
                        />
                        <Button
                            data-test-id='submit-button'
                            type='submit'
                            variant='black'
                            h={12}
                            w='100%'
                            mt={88}
                            isDisabled={isLoading}
                        >
                            Войти
                        </Button>
                    </form>

                    <Text
                        data-test-id='forgot-password'
                        w='100%'
                        textAlign='center'
                        fontWeight={600}
                        fontSize={16}
                        lineHeight='150%'
                        color='#000'
                        mt={4}
                        cursor='pointer'
                        onClick={handleToggleCheckEmailForm}
                    >
                        Забыли логин или пароль?
                    </Text>
                </VStack>
                <Text
                    fontWeight={600}
                    fontSize={12}
                    lineHeight='133%'
                    textAlign='left'
                    color='#000'
                    alignSelf='flex-start'
                    mt='auto'
                >
                    Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                </Text>
                {alertError && (
                    <AuthErrorAlert error={alertError} handleCloseModal={handleCloseErrorAlert} />
                )}
                {isVisibleSuccessAlert && (
                    <AuthSuccessAlert
                        title={isVisibleSuccessAlert.title}
                        message={isVisibleSuccessAlert?.message}
                        handleCloseModal={handleCloseSuccessAlert}
                    />
                )}
            </VStack>

            <Flex
                display={{ base: 'none', lg: 'flex' }}
                flex='1 1 50%'
                bgImage='url(src/shared/assets/authBg.jpg)'
                bgPos='right'
                bgSize='cover'
                bgRepeat='no-repeat'
                minH='100%'
                p={30}
                alignItems='flex-end'
                justifyContent='flex-end'
            >
                <Text
                    fontWeight={600}
                    fontSize={12}
                    lineHeight='133%'
                    textAlign='left'
                    color='#000'
                >
                    Лучший сервис для ваших кулинарных побед
                </Text>
            </Flex>
            {(isLoading || isCheckEmailLoading || isVerifyOTPLoading || isResetLoading) && (
                <Loader />
            )}
            {isModalVisible && (
                <SignInError handleClick={handleModalClick} handleCloseModal={handleCloseModal} />
            )}
            {isVisibleCheckEmailForm && (
                <RecoveryCheckEmailForm
                    handleCloseModal={handleToggleCheckEmailForm}
                    handleClick={handleClickCheckEmail}
                    isError={isCheckEmailError}
                    error={
                        checkEmailError && 'status' in checkEmailError ? checkEmailError : undefined
                    }
                />
            )}
            {isVisibleOTP && (
                <RecoveryOTP
                    handleCloseModal={() => {
                        setOTPVisibility(false);
                    }}
                    handleSubmit={handleClickVerifyOTP}
                    email={originalArgs?.email}
                    isError={isVerifyOTPError}
                    error={
                        verifyOTPError && 'status' in verifyOTPError ? verifyOTPError : undefined
                    }
                />
            )}
            {isVisibleRecoveryForm && (
                <RecoveryForm
                    handleCloseModal={() => {
                        setRecoveryFormVisibility(false);
                    }}
                    handleClick={handleClickReset}
                    isError={isResetError}
                    error={resetError && 'status' in resetError ? resetError : undefined}
                />
            )}
        </HStack>
    );
}
