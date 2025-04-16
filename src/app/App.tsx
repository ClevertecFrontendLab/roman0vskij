import { Box, ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';

import { Footer } from '~/common/footer';
import { Header } from '~/components/header';
import { Sidebar } from '~/components/sidebar';
import { Statbar } from '~/components/statbar';
import { MainPage } from '~/pages/main';
import { TheJuiciestPage } from '~/pages/theJuiciest';
import { VeganPage } from '~/pages/vegan';
import { useGetPostsQuery } from '~/query/services/posts.ts';
import { theme } from '~/shared/config/theme';

export default function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    //TODO  Подключить хранилку и везде, где использую useLocation, использовать данные из хранилки
    return (
        <ChakraProvider theme={theme}>
            <Box minH='100%' overflow='hidden'>
                <Header />
                <Sidebar />
                <Statbar />

                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/juiciest' element={<TheJuiciestPage />} />
                    <Route path='*' element={<VeganPage />} />
                </Routes>

                <Footer />
            </Box>
        </ChakraProvider>
    );
}
