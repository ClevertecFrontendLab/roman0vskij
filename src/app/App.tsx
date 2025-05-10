import { AppLayout } from './layouts/appLayout';
import { withProviders } from './providers';

//TODO Сохранять в стор для резервного отображения при ошибке.
//TODO внутри CategoryPage проверить: существуют ли такие category и subcategory в данных, полученных с сервера. Если нет — редирект на /not-found.
//TODO! для тестов вернуть свою сортировку по дате рецепта в слайдере
//TODO декомпозировать получение рандомной категории и рецептов для неё
//TODO исправить множественный запрос на randomRecipes (возможно из-за dispatch(randomCategory))
//TODO отдельно вынести getCategoryID, getSubcategoryID, getRecipe для переиспользования
//TODO сброс массива рецептов после поиска, чтобы при перезаходе на главную отображало как обычно
//TODO highlight text after search
//TODO декомпозировать search

export const App = withProviders(AppLayout);
