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
    //TODO! мок данные в один файл
    //TODO! удалить все типы и заменить на один общий (кроме блога)
    //TODO! теги поменять (есть mockCategories, сделать по нему поиск и получение инфы в зависимости от категории карточки)
    //TODO теги в столбик, если несколько
    //TODO! при переходе на страницу с подкатегорией нужно сделать отбор по категории и подкатегории для всех карточек
    //TODO! хлебные крошки тоже подфиксить (нет subCategories, должно быть subcategory)
    //TODO! хлебные крошки и футер в бургере не прокручиваются
    //TODO! при нажатии на хлебные крошки в бургее сворачивать меню
    //TODO! поиск по НАЗВАНИЯМ карточек
    //TODO! при поиске или выборе аллергенов на главной странице прятать слайдер и самое сочное
    //TODO! фильтр аллергенов по ингредиентам
    //TODO! фильтр по типу мяса - по полю meat
    //TODO! фильтр по типу гарнира - по полю side
    //TODO внизу Drawer все выбранные фильтры (тип мяса, аллергены(ЕСЛИ ВКЛ SWITCH) и тд)
    //TODO! выключенный SWITCH очищает все аллергены
    //TODO! фильтровать по Drawer после нажтия на кнопку
    //TODO! фильтровать по аллергенам на Гл. странице СРАЗУ

    //* Я думала что когда мы находимся в категориях,
    //* то фильтруем только по алергенам и поисковому запросу.
    //* А через  drawer вызывается отдельная страница с результатами фильтрации через drawer

    //* Да, логика верная. По категории - поиск и аллергены, фильтры - можно отдельную страницу
    //* или там же, где находимся, отображать отфильтрованные карточки. Зависит от вашей реализации.

    //TODO! подправить архитектуру
    //TODO! onClick по карточке в слайдере делает переход на страницу рецепта по первой категории и первой ЕЁ подкатегории (нужно сделать какой-то отбор по подкатегориям)
    //TODO! бургер-меню + хлебные крошки в бургере
    //TODO! фильтр по аллергенам
    //TODO! Drawer
    //TODO! Search
    //TODO! внедрить store
    //TODO! data-test-id

    return (
        <Box minH='100%'>
            <Header />
            <Sidebar />
            <Statbar />
            <Routing />
            <Footer />
        </Box>
    );
}

export const App = withProviders(AppLayout);
