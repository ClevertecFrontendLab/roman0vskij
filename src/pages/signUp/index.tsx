import {
    Box,
    Button,
    Flex,
    HStack,
    Progress,
    Tab,
    TabList,
    Tabs,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import { SignUpVerification, SignUpVerificationError } from '~/features/auth';
import { useSignUpMutation } from '~/query/services/auth';
import { AuthErrorAlert } from '~/shared/ui/alert/authErrorAlert';
import { FormInput } from '~/shared/ui/formInput';
import { Loader } from '~/shared/ui/loader';
import { Logo } from '~/shared/ui/logo';

type TForm = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
};

export function SignUp() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const emailVerified = params.get('emailVerified');

    const [isVisibleVerificationError, setVerificationError] = useState(false);

    useEffect(() => {
        if (emailVerified === 'false' && !isVisibleVerificationError) {
            setVerificationError(true);
        }
    }, [emailVerified]);

    const navigate = useNavigate();
    const [isSuccessModalVisible, setSuccessModalVisibility] = useState(false);
    const [alertError, setAlertError] = useState<FetchBaseQueryError | null>(null);

    const handleClick = () => navigate('/sign-in');

    const [currentStep, setCurrentStep] = useState(1);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        setValue,
        watch,
        trigger,
    } = useForm({ mode: 'all' });

    const handleTrimOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const { name, value } = e.target;
        setValue(name, value.trim());
    };

    const [signUp, { isLoading, isSuccess, isError, error }] = useSignUpMutation();

    const onSubmit = (data: TForm) => {
        signUp(data);
    };

    useEffect(() => {
        if (isSuccess && !isSuccessModalVisible) {
            setSuccessModalVisibility(true);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError && 'status' in error) {
            setAlertError(error);
        }
    }, [isError, error]);

    const formValues = watch();

    const allFieldNames = [
        'firstName',
        'lastName',
        'email',
        'login',
        'password',
        'confirmPassword',
    ];

    const filledFieldsCount = allFieldNames.filter((name) => {
        const value = formValues[name];

        return value != undefined && String(value).trim() !== '' && !errors[name];
    }).length;

    const maxProgressValue = allFieldNames.length;

    const handleNextStep = async () => {
        const isStep1Valid = await trigger(['firstName', 'lastName', 'email']);

        if (isStep1Valid) {
            setCurrentStep(2);
        }
    };

    const handleCloseErrorAlert = () => {
        setAlertError(null);
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalVisibility(false);
        navigate('/sign-in');
    };

    const handleCloseVerificationError = () => {
        setVerificationError(false);
    };

    return (
        <HStack h='100vh' gap={0} bg='linear-gradient(208deg, #eaffc7 0%, #29813f 100%)'>
            <VStack flex='1 1 50%' h='100%' p={{ base: 4, md: 30 }} pos='relative' gap={0}>
                <VStack w='100%' maxW={461} gap={0}>
                    <Logo variant='form' />
                    <Tabs
                        defaultIndex={1}
                        variant='form'
                        mt={{ base: 10, md: 14, lg: 20 }}
                        w='100%'
                    >
                        <Box>
                            <TabList>
                                <Tab key='sign-in' onClick={handleClick}>
                                    Вход на сайт
                                </Tab>
                                <Tab key='sign-up'>Регистрация</Tab>
                            </TabList>
                        </Box>
                    </Tabs>
                    <VStack mt={10} gap={1} w='100%'>
                        <Text
                            w='100%'
                            textAlign='left'
                            fontWeight={400}
                            fontSize={16}
                            lineHeight='150%'
                            color='#000'
                        >
                            {currentStep === 1
                                ? 'Шаг 1. Личная информация'
                                : 'Шаг 2. Логин и пароль'}
                        </Text>
                        <Progress
                            data-test-id='sign-up-progress'
                            variant='colorful'
                            hasStripe
                            value={(filledFieldsCount / maxProgressValue) * 100}
                            h={2}
                            w='100%'
                        />
                    </VStack>

                    <form
                        data-test-id='sign-up-form'
                        onSubmit={handleSubmit((data) => onSubmit(data as TForm))}
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            marginTop: '24px',
                        }}
                    >
                        {currentStep === 1 && (
                            <>
                                <FormInput
                                    data-test-id='first-name-input'
                                    name='firstName'
                                    register={register}
                                    rules={{
                                        required: 'Введите имя',
                                        pattern: {
                                            value: /^[А-Яа-я]/,
                                            message: 'Должно начинаться с кириллицы А-Я',
                                        },
                                        validate: (value: string) =>
                                            /^[А-Яа-я-]*$/.test(value) ||
                                            'Только кириллица А-Я, и "-"',
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                    }}
                                    errors={errors}
                                    handleTrimOnBlur={handleTrimOnBlur}
                                    placeholder='Имя'
                                    label='Ваше имя'
                                />
                                <FormInput
                                    data-test-id='last-name-input'
                                    name='lastName'
                                    register={register}
                                    rules={{
                                        required: 'Введите фамилию',
                                        pattern: {
                                            value: /^[А-Яа-я]/,
                                            message: 'Должно начинаться с кириллицы А-Я',
                                        },
                                        validate: (value: string) =>
                                            /^[А-Яа-я-]*$/.test(value) ||
                                            'Только кириллица А-Я, и "-"',
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                    }}
                                    errors={errors}
                                    handleTrimOnBlur={handleTrimOnBlur}
                                    placeholder='Фамилия'
                                    label='Ваша фамилия'
                                />
                                <FormInput
                                    data-test-id='email-input'
                                    name='email'
                                    register={register}
                                    rules={{
                                        required: 'Введите e-mail',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Введите корректный e-mail',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                    }}
                                    errors={errors}
                                    handleTrimOnBlur={handleTrimOnBlur}
                                    placeholder='e-mail'
                                    label='Ваш e-mail'
                                />
                                <Button
                                    data-test-id='submit-button'
                                    key='next-step-button'
                                    variant='black'
                                    h={12}
                                    w='100%'
                                    mt={6}
                                    onClick={handleNextStep}
                                >
                                    Дальше
                                </Button>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <FormInput
                                    data-test-id='login-input'
                                    name='login'
                                    register={register}
                                    rules={{
                                        required: 'Введите логин',
                                        minLength: {
                                            value: 5,
                                            message: 'Не соответствует формату',
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9!@#$&_+\-.]*$/,
                                            message: 'Не соответствует формату',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                    }}
                                    errors={errors}
                                    handleTrimOnBlur={handleTrimOnBlur}
                                    placeholder='Введите логин'
                                    label='Логин для входа на сайт'
                                    helperText='Логин не менее 5 символов, только латиница'
                                />
                                <FormInput
                                    data-test-id='password-input'
                                    name='password'
                                    register={register}
                                    rules={{
                                        required: 'Введите пароль',
                                        minLength: {
                                            value: 8,
                                            message: 'Не соответствует формату',
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$&_+\-.]*$/,
                                            message: 'Не соответствует формату',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                    }}
                                    errors={errors}
                                    placeholder='Пароль для сайта'
                                    label='Пароль'
                                    type='password'
                                    helperText='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                                />
                                <FormInput
                                    data-test-id='confirm-password-input'
                                    name='confirmPassword'
                                    register={register}
                                    rules={{
                                        required: 'Повторите пароль',
                                        validate: (value) =>
                                            value === getValues('password') ||
                                            'Пароли должны совпадать',
                                    }}
                                    errors={errors}
                                    placeholder='Повторите пароль'
                                    label='Пароль'
                                    type='password'
                                />
                                <Button
                                    data-test-id='submit-button'
                                    key='submit'
                                    type='submit'
                                    variant='black'
                                    h={12}
                                    w='100%'
                                    mt={6}
                                    isDisabled={isSubmitting}
                                >
                                    Зарегистрироваться
                                </Button>
                            </>
                        )}
                    </form>
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
            {isLoading && <Loader />}
            {isSuccessModalVisible && (
                <SignUpVerification
                    email={({ ...getValues() } as TForm).email}
                    handleCloseModal={handleCloseSuccessModal}
                />
            )}
            {isVisibleVerificationError && (
                <SignUpVerificationError handleCloseModal={handleCloseVerificationError} />
            )}
        </HStack>
    );
}
