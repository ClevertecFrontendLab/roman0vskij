export type TMainCard = {
    img: string;
    title: string;
    text: string;
    hasTag: boolean;
    tag?: string;
    tagImg?: string;
    saves: number;
    smiles: number;
    userName?: string;
    userImg?: string;
};

export const mockMainCards: TMainCard[] = [
    {
        img: '/src/assets/mockData/main1.jpg',
        title: 'Кнели со спагетти',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        hasTag: true,
        tag: 'Вторые блюда',
        tagImg: '/src/assets/categories/secondDishes.png',
        saves: 85,
        smiles: 152,
        userName: '',
        userImg: '',
    },
    {
        img: '/src/assets/mockData/main2.jpg',
        title: 'Пряная ветчина по итальянски',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        hasTag: true,
        tag: 'Вторые блюда',
        tagImg: '/src/assets/categories/secondDishes.png',
        saves: 159,
        smiles: 257,
        userName: 'Елена Высоцкая',
        userImg: '/src/assets/mockData/elena.jpg',
    },
    {
        img: '/src/assets/mockData/main3.jpg',
        title: 'Лапша с курицей и шафраном',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        hasTag: true,
        tag: 'Вторые блюда',
        tagImg: '/src/assets/categories/secondDishes.png',
        saves: 258,
        smiles: 342,
        userName: 'Alex Cook',
        userImg: '/src/assets/mockData/alex.jpg',
    },
    {
        img: '/src/assets/mockData/main4.jpg',
        title: 'Том-ям с капустой кимчи',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        hasTag: true,
        tag: 'Национальные',
        tagImg: '/src/assets/categories/national.png',
        saves: 124,
        smiles: 324,
        userName: '',
        userImg: '',
    },
];
