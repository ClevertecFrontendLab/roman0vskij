import './App.css';

import { Box, ChakraProvider, extendTheme, Show, VStack } from '@chakra-ui/react';

import Filter from '~/common/filter';
import Footer from '~/common/footer';
import GreenButton from '~/common/greenButton';
import PageTitle from '~/common/pageTitle';
import RecipeCard from '~/common/recipeCard';
import Search from '~/common/search';
import Title from '~/common/title';
import Header from '~/components/header';
import Statistic from '~/components/statistic';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const breakpoints = {
        base: '0px',
        sm: '360px',
        md: '768px',
        lg: '1200px',
        xl: '1920px',
        '2xl': '2000px',
    };

    const fonts = {
        body: 'Inter, sans-serif',
        heading: 'Inter, sans-serif',
    };

    const theme = extendTheme({ breakpoints, fonts });

    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    const mockRecipes = [
        {
            img: '/src/assets/mockData/recipe1.jpg',
            title: 'Солянка с грибами',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            hasTag: true,
            tag: 'Первые блюда',
            tagSvg: '/src/assets/categories/ПервыеБлюда.png',
            saves: 1,
            smiles: 0,
        },
        {
            img: '/src/assets/mockData/recipe2.jpg',
            title: 'Капустные котлеты',
            text: 'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
            hasTag: true,
            tag: 'Веганские блюда',
            tagSvg: '/src/assets/categories/ВеганскаяКухня.png',
            saves: 2,
            smiles: 1,
        },
        {
            img: '/src/assets/mockData/recipe3.jpg',
            title: 'Оладьи на кефире "Пышные"',
            text: 'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
            hasTag: true,
            tag: 'Десерты, выпечка',
            tagSvg: '/src/assets/categories/ДесертыВыпечка.png',
            saves: 0,
            smiles: 1,
        },
        {
            img: '/src/assets/mockData/recipe4.jpg',
            title: 'Салат "Здоровье"',
            text: 'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
            hasTag: true,
            tag: 'Салаты',
            tagSvg: '/src/assets/categories/Салаты.png',
            saves: 0,
            smiles: 0,
        },
        {
            img: '/src/assets/mockData/recipe1.jpg',
            title: 'Солянка с грибами',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            hasTag: true,
            tag: 'Первые блюда',
            tagSvg: '/src/assets/categories/ПервыеБлюда.png',
            saves: 1,
            smiles: 0,
        },
        {
            img: '/src/assets/mockData/recipe2.jpg',
            title: 'Капустные котлеты',
            text: 'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
            hasTag: false,
            tag: 'Веганские блюда',
            tagSvg: '/src/assets/categories/ВеганскаяКухня.png',
            saves: 2,
            smiles: 1,
        },
    ];
    //TODO  Кнопка Записать рецепт
    //TODO  Табы на веганской кухне (в зависимости от выбранной категории разные табы)
    //TODO  Маленькая карточка с зеленой кнопкой "готовить"
    //TODO  Футер для пк
    //TODO  Урезанная карточка рецепта
    //TODO  Карточка блога
    //TODO  Карточка рецепта
    //TODO  Аккордеон
    //TODO  Ховера, эффекты и т.д.
    //TODO  Настроить хлебные крошки
    //TODO  Настроить базовый роутинг
    return (
        <ChakraProvider theme={theme}>
            <Box minH='100%' overflow='hidden'>
                <Header />
                <PageTitle
                    title='Приятного аппетита!'
                    subTitle='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                />
                <VStack mb={8} spacing={4}>
                    <Search />
                    <Show above='lg'>
                        <Filter />
                    </Show>
                </VStack>
                <VStack>
                    <GreenButton text='Вся подборка' hasArrow />
                    <GreenButton text='Загрузить еще' />
                </VStack>
                <Footer />
                <Title title='Новые рецепты' />
                <Title title='Кулинарные блоги' isForBlog />
                <Box p={4}>
                    App
                    {/* <HStack spacing={{ base: 4, xl: 6 }}> */}
                    {mockRecipes.map((recipe, i) => (
                        <RecipeCard
                            key={`recipe${i}`}
                            img={recipe.img}
                            title={recipe.title}
                            text={recipe.text}
                            hasTag={recipe.hasTag}
                            tag={recipe.tag}
                            tagSvg={recipe.tagSvg}
                            saves={recipe.saves}
                            smiles={recipe.smiles}
                        />
                    ))}
                    {/* </HStack> */}
                    <Statistic />
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
