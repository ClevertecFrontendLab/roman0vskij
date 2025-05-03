import { Box } from '@chakra-ui/react';

import { Loader } from '~/shared/ui/loader';
import { userLoadingSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';
import { Footer } from '~/widgets/footer';
import { Header } from '~/widgets/header';
import { Sidebar } from '~/widgets/sidebar';
import { Statbar } from '~/widgets/statbar';

import { withProviders } from './providers';
import { Routing } from './routing';

export function AppLayout() {
    //TODO! GET /category → получение списка категорий. Использовать для боковой панели (динамически).
    //TODO Сохранять в стор для резервного отображения при ошибке.
    //TODO GET /recipe?sortBy=createdAt&sortOrder=desc&limit=10 Для слайдера на главной (новые рецепты).
    //TODO GET /recipe с рандомной категорией Для блока "relevant kitchen" (внизу страницы).
    //TODO внутри CategoryPage проверить: существуют ли такие category и subcategory в данных, полученных с сервера. Если нет — редирект на /not-found.

    //TODO 3. "Самое сочное" блок
    //TODO 3.1 Главная страница
    //TODO Отобразить топ-рецепты по лайкам.
    //TODO 3.2 Страница /the-juiciest
    //TODO GET /recipe?sortBy=likes&sortOrder=desc
    //TODO Пагинация: кнопка "Загрузить ещё"
    //TODO Добавляет рецепты, а не перерисовывает весь список.
    //TODO Прячется, если достигнут конец.

    //TODO 4. Страница ошибки
    //TODO 4.1 /not-found
    //TODO Неизвестная категория/подкатегория → редирект на /not-found.
    //TODO Примеры: vegansss/snack, vegan/meatballs (если meatballs нет).
    //TODO Обязательно:

    //TODO 5. Страница рецепта
    //TODO 5.1 Данные
    //TODO GET /recipe/{id} до рендера страницы.
    //TODO Отображать Alert при ошибке → возврат на предыдущую страницу.
    //TODO 5.2 Поведение
    //TODO Кол-во порций — можно менять.
    //TODO При перезагрузке → сброс на дефолтное значение.
    //TODO Breadcrumbs и кнопки работают как в спринте 2.

    //TODO 6. Поиск и фильтрация
    //TODO 6.1 Поиск
    //TODO Кнопка поиска активна, если:
    //TODO ≥ 3 символов, или
    //TODO выбраны аллергены.
    //TODO По нажатию:
    //TODO Запрос с query-параметрами (см. ниже).
    //TODO 6.2 Query-параметры
    //TODO page, limit, allergens, searchString, meat, garnish, subcategoriesIds, sortBy, sortOrder
    //TODO Учитывать текущий контекст:
    //TODO Главная → фильтр из панели.
    //TODO Категория → все её подкатегории.
    //TODO 6.3 Отображение
    //TODO! Лоадер при запросе
    //TODO Ошибка (data-test-id="error-notification").
    //TODO Пустой результат → показываем сообщение.
    //TODO Кнопка "Загрузить ещё" → data-test-id="load-more-button".

    //TODO 7. data-test-id

    const isLoading = useAppSelector(userLoadingSelector);

    return (
        <Box minH='100%'>
            <Header />
            <Sidebar />
            <Statbar />
            <Routing />
            <Footer />
            {isLoading && <Loader />}
        </Box>
    );
}

export const App = withProviders(AppLayout);
