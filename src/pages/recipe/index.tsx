import {
    Avatar,
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';

import { selectCategories } from '~/entities/category';
import { selectCurrentRecipe } from '~/entities/recipe';
import { ApiBaseURL } from '~/query/constants/base';
import {
    BookmarkIcon,
    LikeIcon,
    OutlineSubscribersIcon,
    SubscribeIcon,
} from '~/shared/assets/icons';
import { CardStatistic } from '~/shared/ui/cardStatistic';
import { ListOfIngredients } from '~/shared/ui/listOfIngredients';
import { Macronutrient } from '~/shared/ui/macronutrient';
import PageLoader from '~/shared/ui/pageLoader';
import { StepCard } from '~/shared/ui/stepCard';
import { Tag } from '~/shared/ui/tag';
import { Title } from '~/shared/ui/title';
import { pageLoadingSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';
import { Slider } from '~/widgets/slider';

export function RecipePage() {
    const isPageLoading = useAppSelector(pageLoadingSelector);
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

    const [_, category] = location.pathname.split('/');

    const currentRecipe = useAppSelector(selectCurrentRecipe);
    const categories = useAppSelector(selectCategories);

    const currentCategory = categories.find((c) => c.category === category);

    if (!currentRecipe || !currentCategory) return <Box />;

    return (
        <Box
            as='main'
            maxW='1920px'
            w='100%'
            m='0 auto'
            pt={{ base: '64px', lg: '80px' }}
            px={{ base: 4, md: 5, lg: '280px' }}
        >
            {isPageLoading ? (
                <PageLoader />
            ) : (
                <>
                    <Grid
                        templateRows={{ base: '224px 1fr', md: '224px', lg: '410px' }}
                        templateColumns={{
                            base: '1fr',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(12, 1fr)',
                        }}
                        mt={{ base: 4, lg: '56px' }}
                        gap={{ base: 4, lg: 6 }}
                        minH={{ base: 'auto', md: '224px', lg: '410px' }}
                        h='fit-content'
                    >
                        <GridItem rowSpan={1} colSpan={{ base: 1, lg: 5 }}>
                            <Image
                                h='100%'
                                w='100%'
                                objectFit='cover'
                                src={ApiBaseURL.IMG_URL + currentRecipe.image}
                                alt='recipe'
                                borderRadius={8}
                            />
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={{ base: 1, md: 2, lg: 7 }}>
                            <Flex
                                direction='column'
                                align='flex-start'
                                justify='flex-start'
                                w='100%'
                                h='100%'
                            >
                                <Flex
                                    direction='row'
                                    justify='space-between'
                                    w='100%'
                                    gap={{ base: 2, xl: 4 }}
                                >
                                    <Box
                                        display='flex'
                                        gap={{ base: 2, xl: 4 }}
                                        flexWrap='wrap'
                                        alignItems='flex-start'
                                    >
                                        <Tag
                                            bgClr='#ffffd3'
                                            img={ApiBaseURL.IMG_URL + currentCategory.icon}
                                            title={currentCategory.title}
                                        />
                                    </Box>
                                    <CardStatistic
                                        bookmarks={currentRecipe.bookmarks}
                                        likes={currentRecipe.likes}
                                    />
                                </Flex>
                                <Heading
                                    fontWeight={700}
                                    fontSize={{ base: 24, lg: 48 }}
                                    lineHeight={{ base: '133%', lg: '100%' }}
                                    color='#000'
                                    mt={8}
                                    maxW='437px'
                                >
                                    {currentRecipe.title}
                                </Heading>
                                <Text
                                    fontWeight={400}
                                    fontSize={14}
                                    lineHeight='143%'
                                    color='#000'
                                    mt={{ base: 4, lg: 6 }}
                                    maxW='528px'
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 'auto',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {currentRecipe.description}
                                </Text>
                                <Stack
                                    direction={{ base: 'column', md: 'row' }}
                                    gap={{ base: 3, xl: 4 }}
                                    align={{ md: 'flex-end' }}
                                    mt={{ base: 6, md: 'auto' }}
                                    justify='space-between'
                                    w='100%'
                                    wrap='wrap'
                                >
                                    <Tag
                                        bgClr='rgba(0, 0, 0, 0.06)'
                                        key='clock'
                                        img='/src/shared/assets/clock.png'
                                        title={`${currentRecipe.time} минут`}
                                    />
                                    <HStack gap={{ base: 3, xl: 4 }} flexWrap='wrap'>
                                        <Button
                                            display='flex'
                                            bgColor='transparent'
                                            leftIcon={
                                                <LikeIcon
                                                    fill=' rgba(0, 0, 0, 0.8)'
                                                    w={{ base: 3, lg: 3.5, xl: 4 }}
                                                    h={{ base: 3, lg: 3.5, xl: 4 }}
                                                    mr={{ base: -0.5, lg: 0 }}
                                                />
                                            }
                                            py={{ base: 1, lg: 1.5, xl: 2.5 }}
                                            px={{ base: 2, lg: 3, xl: 6 }}
                                            border='1px solid rgba(0, 0, 0, 0.48)'
                                            borderRadius={6}
                                            fontWeight={600}
                                            fontSize={{ base: 12, lg: 14, xl: 18 }}
                                            lineHeight={{ base: '133%', lg: '143%', xl: '156%' }}
                                            color='rgba(0, 0, 0, 0.8)'
                                            _hover={{ bgColor: 'none' }}
                                            _active={{ bgColor: 'none' }}
                                        >
                                            Оценить рецепт
                                        </Button>
                                        <Button
                                            display='flex'
                                            bgColor='#b1ff2e'
                                            leftIcon={
                                                <BookmarkIcon
                                                    w={{ base: 3, lg: 3.5, xl: 4 }}
                                                    h={{ base: 3, lg: 3.5, xl: 4 }}
                                                    mr={{ base: -0.5, lg: 0 }}
                                                />
                                            }
                                            py={{ base: 1, lg: 1.5, xl: 2.5 }}
                                            px={{ base: 2, lg: 3, xl: 6 }}
                                            borderRadius={6}
                                            fontWeight={600}
                                            fontSize={{ base: 12, lg: 14, xl: 18 }}
                                            lineHeight={{ base: '133%', lg: '143%', xl: '156%' }}
                                            color='#000'
                                            _hover={{ bgColor: 'none' }}
                                            _active={{ bgColor: 'none' }}
                                        >
                                            Сохранить в закладки
                                        </Button>
                                    </HStack>
                                </Stack>
                            </Flex>
                        </GridItem>
                    </Grid>
                    <VStack gap={0} mt={{ base: 6, lg: 10 }}>
                        <Box maxW={668} w='100%'>
                            <VStack
                                maxW={{ base: 328, md: 668 }}
                                w='100%'
                                gap={{ base: 3, md: 5 }}
                                justifySelf='center'
                            >
                                <Text
                                    fontWeight={400}
                                    fontSize={14}
                                    lineHeight='143%'
                                    color='rgba(0, 0, 0, 0.8)'
                                    w='100%'
                                >
                                    * Калорийность на 1 порцию
                                </Text>
                                <Flex
                                    gap={{ base: 3, xl: 6 }}
                                    h='fit-content'
                                    direction={{ base: 'column', md: 'row' }}
                                    w='100%'
                                >
                                    <Macronutrient
                                        text='калорийность'
                                        value={currentRecipe.nutritionValue.calories}
                                        unit='ККАЛ'
                                    />
                                    <Macronutrient
                                        text='белки'
                                        value={currentRecipe.nutritionValue.protein}
                                        unit='ГРАММ'
                                    />
                                    <Macronutrient
                                        text='жиры'
                                        value={currentRecipe.nutritionValue.fats}
                                        unit='ГРАММ'
                                    />
                                    <Macronutrient
                                        text='углеводы'
                                        value={currentRecipe.nutritionValue.carbohydrates}
                                        unit='ГРАММ'
                                    />
                                </Flex>
                            </VStack>
                            <Box w='100%' mt={{ base: 6, lg: 10 }}>
                                <ListOfIngredients
                                    portions={currentRecipe.portions}
                                    ingredients={currentRecipe.ingredients}
                                />
                            </Box>
                            <VStack align='flex-start' w='100%' mt={{ base: 6, lg: 10 }} gap={5}>
                                <Heading
                                    fontWeight={500}
                                    fontSize={{ base: 24, lg: 48 }}
                                    lineHeight={{ base: '133%', lg: '100%' }}
                                    color='#000'
                                    w='fit-content'
                                >
                                    Шаги приготовления
                                </Heading>
                                {currentRecipe.steps.map((step, i, arr) =>
                                    i === arr.length - 1 ? (
                                        <StepCard last key={`step${step.stepNumber}`} {...step} />
                                    ) : (
                                        <StepCard key={`step${step.stepNumber}`} {...step} />
                                    ),
                                )}
                            </VStack>
                            <Flex
                                bgColor='#c4ff61'
                                borderRadius={8}
                                w='100%'
                                h={{ base: 120, md: 144 }}
                                p={{ base: 3, md: 6 }}
                                gap={{ base: 2, md: 4 }}
                                mt={{ base: 6, lg: 10 }}
                            >
                                <Avatar size='xl' src='/src/shared/assets/mockData/sergey.jpg' />
                                <VStack position='relative' w='100%' align='flex-start' gap={0}>
                                    <Text
                                        position='absolute'
                                        top={{ base: -1, md: 0 }}
                                        right={{ base: -1, md: 0 }}
                                        fontWeight={400}
                                        fontSize={{ base: 12, md: 14 }}
                                        lineHeight={{ base: '133%', md: '143%' }}
                                        color='#000'
                                    >
                                        Автор рецепта
                                    </Text>
                                    <Heading
                                        fontWeight={{ base: 600, md: 700 }}
                                        fontSize={{ base: 18, md: 24 }}
                                        lineHeight={{ base: '156%', md: '133%' }}
                                        color='#000'
                                        mt={{ base: 2, md: 0 }}
                                    >
                                        Сергей Разумов
                                    </Heading>
                                    <Text
                                        fontWeight={400}
                                        fontSize={14}
                                        lineHeight='143%'
                                        color='rgba(0, 0, 0, 0.64)'
                                        mt={{ md: 1 }}
                                    >
                                        @serge25
                                    </Text>
                                    <HStack justify='space-between' w='100%' mt={4}>
                                        <Button
                                            variant='none'
                                            leftIcon={<SubscribeIcon mr={-0.5} />}
                                            bgColor='rgba(0, 0, 0, 0.92)'
                                            border='1px solid rgba(0, 0, 0, 0.08)'
                                            fontWeight={600}
                                            fontSize={12}
                                            lineHeight='133%'
                                            color='#fff'
                                            h={6}
                                            w='fit-content'
                                            p='4px 8px'
                                        >
                                            Подписаться
                                        </Button>
                                        <Flex align='center' gap={1.5}>
                                            <OutlineSubscribersIcon />
                                            <Text
                                                fontWeight={600}
                                                fontSize={12}
                                                lineHeight='133%'
                                                color='#2db100'
                                            >
                                                125
                                            </Text>
                                        </Flex>
                                    </HStack>
                                </VStack>
                            </Flex>
                        </Box>
                    </VStack>
                    <Box mt={{ base: 10, lg: 14 }}>
                        <Title key='title1' title='Новые рецепты' />
                        <Slider />
                    </Box>
                    {isLargerThan1000 ? <></> : <Box height={100} />}
                </>
            )}
        </Box>
    );
}
