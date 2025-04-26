import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Hide,
    IconButton,
    Image,
    Show,
    Text,
    VStack,
} from '@chakra-ui/react';

import { BookmarkIcon } from '~/shared/assets/icons';
import { TMock } from '~/shared/types';
import { CardStatistic } from '~/shared/ui/cardStatistic';
import { RecomendationTag } from '~/shared/ui/recomendationTag';
import { Tag } from '~/shared/ui/tag';

export function MainCard(props: TMock) {
    const userName = 'Alex Cook';
    const userImg = '/src/shared/assets/mockData/alex.jpg';
    return (
        <Card
            w='100%'
            h={{ base: 128, lg: 244 }}
            borderRadius={8}
            border='1px solid rgba(0, 0, 0, 0.08)'
            bgColor='#fff'
            direction='row'
            variant='none'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
        >
            <Image
                position='relative'
                minW={{ base: 158, lg: 346 }}
                objectFit='cover'
                src={props.image}
                alt='recipe'
                borderLeftRadius={8}
            />
            {userName && (
                <Show above='lg'>
                    <Box position='absolute' bottom={5} left={6}>
                        <RecomendationTag bgClr='#d7ff94' userImg={userImg} userName={userName} />
                    </Box>
                </Show>
            )}
            <VStack
                align='flex-start'
                px={{ base: 2, lg: 6 }}
                pt={{ base: 2, lg: 5 }}
                pb={{ base: 1, lg: 5 }}
                gap={0}
                w='100%'
            >
                <Flex mb={{ base: 0, lg: 6 }} justify='space-between' w='100%'>
                    <Show above='lg'>
                        <Tag bgClr='#ffffd3' {...props} />
                    </Show>
                    <Hide above='lg'>
                        <Box position='absolute' top={2} left={2} w='100%'>
                            <Tag bgClr='#ffffd3' {...props} />
                        </Box>
                    </Hide>
                    <CardStatistic bookmarks={props.bookmarks} likes={props.likes} />
                </Flex>
                <CardHeader mb={{ base: 5, lg: 2 }} p={0}>
                    <Heading
                        fontSize={{ base: 16, lg: 20 }}
                        fontWeight={500}
                        lineHeight={{ base: '150%', lg: '140%' }}
                        color='#000'
                        sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: { base: 2, lg: 1 },
                        }}
                    >
                        {props.title}
                    </Heading>
                </CardHeader>
                <Show above='lg'>
                    <CardBody mb={{ lg: 6 }} maxH={24} overflow='hidden' p={0}>
                        <Text
                            fontWeight={400}
                            fontSize={14}
                            lineHeight='143%'
                            color='#000'
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {props.description}
                        </Text>
                    </CardBody>
                </Show>

                <CardFooter
                    alignItems='end'
                    justify='flex-end'
                    gap={{ base: 3, lg: 2 }}
                    w='100%'
                    h={{ base: '100%', lg: 'auto' }}
                    p={0}
                >
                    <Show above='lg'>
                        <Button
                            variant='none'
                            leftIcon={<BookmarkIcon w={3.5} h={3.5} />}
                            border=' 1px solid rgba(0, 0, 0, 0.48)'
                            fontWeight={600}
                            fontSize={14}
                            lineHeight='143%'
                            color='rgba(0, 0, 0, 0.8)'
                            h={8}
                            w='122px'
                            p={{ base: '4px 8px', lg: '6px 12px' }}
                        >
                            Сохранить
                        </Button>
                    </Show>
                    <Hide above='lg'>
                        <IconButton
                            variant='none'
                            aria-label='save button'
                            icon={<BookmarkIcon />}
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            minW={0}
                            w={6}
                            h={6}
                            fontSize={0}
                        />
                    </Hide>
                    <Button
                        variant='none'
                        bgColor='rgba(0, 0, 0, 0.92)'
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        fontWeight={600}
                        fontSize={{ base: 12, lg: 14 }}
                        lineHeight={{ base: '133%', lg: '143%' }}
                        color='#fff'
                        h={{ base: 6, lg: 8 }}
                        w={{ base: '70px', lg: '87px' }}
                        p={{ base: '4px 8px', lg: '6px 12px' }}
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </VStack>
        </Card>
    );
}
