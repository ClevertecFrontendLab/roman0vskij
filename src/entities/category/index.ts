export { selectCategories, selectRandomCategory } from './model/selectors';
export {
    default as categoriesReducer,
    categoriesSlice,
    setCategories,
    setRandomCategory,
} from './model/slice';
export type { TCategory, TSubCategory } from './model/types';
