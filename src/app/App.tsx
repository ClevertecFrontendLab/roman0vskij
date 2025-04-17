import { Box } from '@chakra-ui/react';

import { useGetPostsQuery } from '~/query/services/posts.ts';
import { Footer } from '~/widgets/footer';
import { Header } from '~/widgets/header';
import { Sidebar } from '~/widgets/sidebar';
import { Statbar } from '~/widgets/statbar';

import { withProviders } from './providers';
import { Routing } from './routing';

export function AppLayout() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    //TODO  перенести store, query

    return (
        <Box minH='100%' overflow='hidden'>
            <Header />
            <Sidebar />
            <Statbar />
            <Routing />
            <Footer />
        </Box>
    );
}

export const App = withProviders(AppLayout);
