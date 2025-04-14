export type TRecipe = {
    img: string;
    title: string;
    text: string;
    hasTag: boolean;
    tag?: string;
    tagImg?: string;
    saves: number;
    smiles: number;
};

export const mockRecipes: TRecipe[] = [
    {
        img: '/src/assets/mockData/recipe1.jpg',
        title: 'Солянка с грибами',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        hasTag: true,
        tag: 'Первые блюда',
        tagImg: '/src/assets/categories/firstDishes.png',
        saves: 1,
        smiles: 0,
    },
    {
        img: '/src/assets/mockData/recipe2.jpg',
        title: 'Капустные котлеты',
        text: 'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        hasTag: true,
        tag: 'Веганские блюда',
        tagImg: '/src/assets/categories/vegan.png',
        saves: 2,
        smiles: 1,
    },
    {
        img: '/src/assets/mockData/recipe3.jpg',
        title: 'Оладьи на кефире "Пышные"',
        text: 'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        hasTag: true,
        tag: 'Десерты, выпечка',
        tagImg: '/src/assets/categories/desserts.png',
        saves: 0,
        smiles: 1,
    },
    {
        img: '/src/assets/mockData/recipe4.jpg',
        title: 'Салат "Здоровье"',
        text: 'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
        hasTag: true,
        tag: 'Салаты',
        tagImg: '/src/assets/categories/salads.png',
        saves: 0,
        smiles: 0,
    },
    {
        img: '/src/assets/mockData/recipe1.jpg',
        title: 'Солянка с грибами',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        hasTag: true,
        tag: 'Первые блюда',
        tagImg: '/src/assets/categories/firstDishes.png',
        saves: 1,
        smiles: 0,
    },
    {
        img: '/src/assets/mockData/recipe2.jpg',
        title: 'Капустные котлеты',
        text: 'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        hasTag: false,
        tag: 'Веганские блюда',
        tagImg: '/src/assets/categories/vegan.png',
        saves: 2,
        smiles: 1,
    },
];
