import { AppLayout } from './layouts/appLayout';
import { withProviders } from './providers';

//TODO исправить множественный запрос на randomRecipes (возможно из-за dispatch(randomCategory))
//TODO Сохранять категории в localStorage для резервного отображения при ошибке.
//TODO внутри CategoryPage (или в protectedRoute) проверить: существуют ли такие category и subcategory в данных, полученных с сервера. Если нет — редирект на /not-found.
//TODO мб сделать protectedRoute поверх всех роутов, кроме mainLayout

//TODO отдельно вынести getCategoryID, getSubcategoryID, getRecipe для переиспользования

export const App = withProviders(AppLayout);
