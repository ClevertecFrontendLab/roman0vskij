import { Button, Heading, IconButton, VStack } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { CrossIcon } from '~/shared/assets/icons';
import { AuthErrorAlert } from '~/shared/ui/alert/authErrorAlert';
import { BlurBg } from '~/shared/ui/blurBg';
import { FormInput } from '~/shared/ui/formInput';

type TProps = {
    handleCloseModal: () => void;
    handleClick: (data: FieldValues) => void;
    isError: boolean;
    error: FetchBaseQueryError | undefined;
};

export function RecoveryForm({ handleCloseModal, handleClick, isError, error }: TProps) {
    const [isVisibleAlert, setAlertVisibility] = useState(false);

    useEffect(() => {
        if (!isVisibleAlert && isError) {
            setAlertVisibility(isError);
        }
    }, [isError]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        getValues,
    } = useForm();

    const onSubmit = (data: FieldValues) => {
        handleClick(data);
    };

    const handleTrimOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const { name, value } = e.target;
        setValue(name, value.trim());
    };

    return (
        <BlurBg>
            <VStack
                data-test-id='reset-credentials-modal'
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
                <Heading
                    fontWeight={700}
                    fontSize={24}
                    lineHeight='133%'
                    color='#000'
                    textAlign='center'
                >
                    Восстановление
                    <br /> аккаунта
                </Heading>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '24px',
                        gap: '24px',
                    }}
                >
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
                        name='passwordConfirm'
                        register={register}
                        rules={{
                            required: 'Повторите пароль',
                            validate: (value) =>
                                value === getValues('password') || 'Пароли должны совпадать',
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
                        mt={8}
                        isDisabled={isSubmitting}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </VStack>
            {isVisibleAlert && error && (
                <AuthErrorAlert
                    error={error}
                    handleCloseModal={() => {
                        setAlertVisibility(false);
                    }}
                />
            )}
        </BlurBg>
    );
}
