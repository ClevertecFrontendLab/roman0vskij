import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet } from 'react-router';

import { useAppInit } from '~/features/appInit/model/useAppInit';
import Alert from '~/shared/ui/alert';
import { Loader } from '~/shared/ui/loader';
import { userLoadingSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';
import { Footer } from '~/widgets/footer';
import { Header } from '~/widgets/header';
import { Sidebar } from '~/widgets/sidebar';
import { Statbar } from '~/widgets/statbar';

export function MainLayout() {
    const isLoading = useAppSelector(userLoadingSelector);
    const [initialLoading, setInitialLoading] = useState(false);
    useAppInit(() => setInitialLoading(true));

    return (
        <Box>
            <Header />
            <Sidebar />
            <Statbar />
            {initialLoading && <Outlet />}
            <Footer />
            {isLoading && <Loader />}
            <Alert />
        </Box>
    );
}
