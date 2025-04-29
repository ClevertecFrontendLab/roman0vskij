import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { theme } from '~/shared/config/theme';
import { store } from '~/store/configure-store';

export function withProviders(Component: React.FC) {
    return function WrappedApp() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <ChakraProvider theme={theme}>
                        <Component />
                    </ChakraProvider>
                </BrowserRouter>
            </Provider>
        );
    };
}
