import './App.css';

import { ChakraProvider } from '@chakra-ui/react';

import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <ChakraProvider>
            <div className='wrapper'></div>
        </ChakraProvider>
    );
}

export default App;
