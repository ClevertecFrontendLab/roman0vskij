import {
    Alert as AlertWrapper,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    VStack,
} from '@chakra-ui/react';

import { CrossIcon } from '~/shared/assets/icons';

type TProps = {
    title: string;
    message?: string;
    handleCloseModal: () => void;
};

export function AuthSuccessAlert({ title, message, handleCloseModal }: TProps) {
    return (
        <AlertWrapper
            data-test-id='error-notification'
            status='success'
            pos='absolute'
            bottom={{ base: 100, lg: 20 }}
            maxW={{ base: 328, lg: 400 }}
            w='100%'
            minH='fit-content'
            bg='#38a169'
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
                    {title}
                </AlertTitle>
                {message && (
                    <AlertDescription color='#fff' w='100%' fontWeight={400}>
                        {message}
                    </AlertDescription>
                )}
            </VStack>
        </AlertWrapper>
    );
}
