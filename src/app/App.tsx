import './App.css';

import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';

import Header from '~/components/header';
import Statistic from '~/components/statistic';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const breakpoints = {
        base: '0px',
        sm: '360px',
        md: '768px',
        lg: '1440px',
        xl: '1920px',
        '2xl': '2000px',
    };

    const fonts = {
        body: 'Inter, sans-serif',
        heading: 'Inter, sans-serif',
        mono: 'Inter, sans-serif',
    };

    const theme = extendTheme({ breakpoints, fonts });

    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <ChakraProvider theme={theme}>
            <Box minH='100%' overflow='hidden'>
                <Header />
                App
                <Statistic />
            </Box>
        </ChakraProvider>
    );
}

export default App;
