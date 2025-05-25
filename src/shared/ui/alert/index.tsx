import {
    Alert as AlertWrapper,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    VStack,
} from '@chakra-ui/react';

import { CrossIcon } from '~/shared/assets/icons';
import { setAppError, userErrorSelector } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export default function Alert() {
    const dispatch = useAppDispatch();
    const error = useAppSelector(userErrorSelector);

    function handleOnclick() {
        dispatch(setAppError(null));
    }

    return (
        error && (
            <AlertWrapper
                data-test-id='error-notification'
                status='error'
                pos='fixed'
                bottom={{ base: 100, lg: 20 }}
                left='50%'
                transform='translateX(-50%)'
                maxW={{ base: 328, lg: 400 }}
                w='100%'
                h='max-content'
                bg='#e53e3e'
            >
                <AlertIcon color='#fff' mr={3.5} />
                <CrossIcon
                    data-test-id='close-alert-button'
                    onClick={handleOnclick}
                    cursor='pointer'
                    fill='#fff'
                    position='absolute'
                    top={3}
                    right={3}
                />
                <VStack gap={0}>
                    <AlertTitle color='#fff' w='100%' m={0}>
                        {error?.error}
                    </AlertTitle>
                    <AlertDescription color='#fff' w='100%' fontWeight={400}>
                        {error?.message}
                    </AlertDescription>
                </VStack>
            </AlertWrapper>
        )
    );
}
