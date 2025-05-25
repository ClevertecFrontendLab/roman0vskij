import { Button, IconButton, Image, Text, VStack } from '@chakra-ui/react';
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

export function RecoveryCheckEmailForm({ handleCloseModal, handleClick, isError, error }: TProps) {
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
        reset,
    } = useForm();

    const onSubmit = (data: FieldValues) => {
        handleClick(data);
        reset();
    };

    const handleTrimOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const { name, value } = e.target;
        setValue(name, value.trim());
    };

    return (
        <BlurBg>
            <VStack
                data-test-id='send-email-modal'
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
                    src='/src/shared/assets/checkEmail.jpg'
                    alt='check-email image'
                    w={{ base: 108, lg: 206 }}
                    h={{ base: 108, lg: 206 }}
                />
                <Text
                    fontWeight={400}
                    fontSize={16}
                    lineHeight='150%'
                    color='rgba(0, 0, 0, 0.64)'
                    mt={8}
                    textAlign='center'
                >
                    Для восстановления входа введите
                    <br /> ваш e-mail, куда можно отправить уникальный код
                </Text>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '16px',
                    }}
                >
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
                        type='submit'
                        variant='black'
                        w='100%'
                        h={12}
                        isDisabled={isSubmitting}
                        mt={6}
                    >
                        Получить код
                    </Button>
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
                    error={
                        error?.status === 403
                            ? {
                                  status: 402,
                                  data: {
                                      error: 'Такого e-mail нет',
                                      message:
                                          'Попробуйте другой e-mail или проверьте правильность его написания',
                                  },
                              }
                            : error
                    }
                    handleCloseModal={() => {
                        setAlertVisibility(false);
                    }}
                />
            )}
        </BlurBg>
    );
}
