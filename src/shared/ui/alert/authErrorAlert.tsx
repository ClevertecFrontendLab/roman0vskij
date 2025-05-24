import {
    Alert as AlertWrapper,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    VStack,
} from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { CrossIcon } from '~/shared/assets/icons';

type TProps = {
    error: FetchBaseQueryError;
    handleCloseModal: () => void;
};

type CustomErrorData = {
    error: string;
    message: string;
};

export function AuthErrorAlert({ error, handleCloseModal }: TProps) {
    const errorData = error?.data as CustomErrorData;
    let errorTitle = '';
    let errorMessage = '';

    if (+error.status / 100 === 5) {
        errorTitle = 'Ошибка сервера';
        errorMessage = 'Попробуйте немного позже';
    } else if (error.status === 400) {
        errorTitle = errorData.message;
        errorMessage = '';
    } else if (error.status === 401) {
        errorTitle = errorData.message ?? 'Неверный логин или пароль';
        errorMessage = 'Попробуйте снова.';
    } else if (error.status === 403) {
        errorTitle = errorData.message ?? 'E-mail не верифицирован';
        errorMessage = 'Проверьте почту и перейдите по ссылке';
    } else {
        errorTitle = errorData.error;
        errorMessage = errorData.message;
    }

    return (
        <AlertWrapper
            data-test-id='error-notification'
            status='error'
            pos='absolute'
            bottom={{ base: 100, lg: 20 }}
            maxW={{ base: 328, lg: 400 }}
            w='100%'
            minH='fit-content'
            bg='#e53e3e'
        >
            <AlertIcon color='#fff' mr={3.5} />
            <CrossIcon
                data-test-id='close-alert-button'
                onClick={handleCloseModal}
                cursor='pointer'
                fill='#fff'
                position='absolute'
                top={3}
                right={3}
            />
            <VStack gap={0}>
                <AlertTitle color='#fff' w='100%' m={0}>
                    {errorTitle}
                </AlertTitle>
                {errorMessage && (
                    <AlertDescription color='#fff' w='100%' fontWeight={400}>
                        {errorMessage}
                    </AlertDescription>
                )}
            </VStack>
        </AlertWrapper>
    );
}
