import { Center, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export function NotFoundPage() {
    const navigate = useNavigate();

    function handleOnclick() {
        navigate('/');
    }

    return (
        <Center
            as='main'
            maxW='1920px'
            w='100%'
            h='calc(100vh - 80px)'
            m='0 auto'
            pt={{ base: '64px', lg: '80px' }}
            px={{ base: 4, md: 5, lg: '280px' }}
            gap={4}
            flexDir='column'
        >
            <Image
                w={{ base: 108, lg: 206 }}
                h={{ base: 108, lg: 206 }}
                src='/src/shared/assets/notFound.png'
                alt='not-found image'
                mb={4}
            />
            <Heading
                as='h1'
                maxW={{ base: 252, lg: '100%' }}
                fontWeight={700}
                fontSize={24}
                lineHeight='133%'
                color='#000'
                textAlign='center'
            >
                Упс! Такой страницы нет
            </Heading>
            <Text
                maxW={{ base: 252, lg: '100%' }}
                fontWeight={400}
                fontSize={16}
                lineHeight='150%'
                color='rgba(0, 0, 0, 0.64)'
                textAlign='center'
            >
                Можете поискать другой рецепт{' '}
                <span
                    onClick={handleOnclick}
                    style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.64)', cursor: 'pointer' }}
                    data-test-id='error-page-go-home'
                >
                    здесь.
                </span>
            </Text>
        </Center>
    );
}
