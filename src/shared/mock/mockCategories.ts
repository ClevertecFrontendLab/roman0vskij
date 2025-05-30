import { TCategory } from '~/entities/category';

export const mockCategories: TCategory[] = [
    {
        id: 'salads',
        name: 'Салаты',
        img: '/src/shared/assets/categories/salads.png',
        subCategories: [
            { id: 'meat-salads', name: 'Мясные салаты' },
            { id: 'fish-salads', name: 'Рыбные салаты' },
            { id: 'vegetable-salads', name: 'Овощные салаты' },
            { id: 'warm-salads', name: 'Теплые салаты' },
        ],
    },
    {
        id: 'snacks',
        name: 'Закуски',
        img: '/src/shared/assets/categories/snacks.png',
        subCategories: [
            { id: 'meat-snacks', name: 'Мясные закуски' },
            { id: 'fish-snacks', name: 'Рыбные закуски' },
            { id: 'vegetable-snacks', name: 'Овощные закуски' },
            { id: 'warm-snacks', name: 'Теплые закуски' },
            { id: 'sandwiches', name: 'Бутерброды' },
            { id: 'fastfood', name: 'Фастфуд' },
        ],
    },
    {
        id: 'first-dish',
        name: 'Первые блюда',
        img: '/src/shared/assets/categories/firstDishes.png',
        subCategories: [
            { id: 'meat-soups', name: 'Мясные супы' },
            { id: 'vegetable-soups', name: 'Овощные супы' },
            { id: 'broths', name: 'Бульоны' },
            { id: 'cold-soups', name: 'Холодные супы' },
            { id: 'diet-soups', name: 'Диетические супы' },
        ],
    },
    {
        id: 'second-dish',
        name: 'Вторые блюда',
        img: '/src/shared/assets/categories/secondDishes.png',
        subCategories: [
            { id: 'meat', name: 'Мясные' },
            { id: 'fish', name: 'Рыбные' },
            { id: 'vegetable', name: 'Овощные' },
            { id: 'poultry-dish', name: 'Из птицы' },
            { id: 'mushrooms', name: 'Из грибов' },
            { id: 'offal', name: 'Из субпродуктов' },
            { id: 'steamed', name: 'На пару' },
            { id: 'dumplings', name: 'Пельмени, вареники' },
            { id: 'flour-side', name: 'Мучные гарниры' },
            { id: 'vegetable-side', name: 'Овощные гарниры' },
            { id: 'pizza', name: 'Пицца' },
            { id: 'sushi', name: 'Суши' },
        ],
    },
    {
        id: 'desserts',
        name: 'Десерты, выпечка',
        img: '/src/shared/assets/categories/desserts.png',
        subCategories: [
            { id: 'pancakes', name: 'Блины и оладьи' },
            { id: 'pies', name: 'Пироги и пончики' },
            { id: 'cakes', name: 'Торты' },
            { id: 'rolls', name: 'Рулеты' },
            { id: 'muffins', name: 'Кексы и маффины' },
            { id: 'cheesecakes', name: 'Сырники и ватрушки' },
            { id: 'puff-pastry', name: 'Из слоеного теста' },
            { id: 'choux-pastry', name: 'Из заварного теста' },
            { id: 'yeast-dough', name: 'Из дрожжевого теста' },
            { id: 'buns', name: 'Булочки и сдоба' },
            { id: 'bread', name: 'Хлеб' },
            { id: 'pizza-dough', name: 'Тесто на пиццу' },
            { id: 'creams', name: 'Кремы' },
        ],
    },
    {
        id: 'grilled',
        name: 'Блюда на гриле',
        img: '/src/shared/assets/categories/grilled.png',
        subCategories: [
            { id: 'grill-beef', name: 'Говядина' },
            { id: 'grill-pork', name: 'Свинина' },
            { id: 'grill-poultry', name: 'Птица' },
            { id: 'grill-fish', name: 'Рыба' },
            { id: 'grill-mushrooms', name: 'Грибы' },
            { id: 'grill-vegetables', name: 'Овощи' },
        ],
    },
    {
        id: 'vegan',
        name: 'Веганская кухня',
        img: '/src/shared/assets/categories/vegan.png',
        subCategories: [
            { id: 'snacks', name: 'Закуски' },
            { id: 'vegan-first', name: 'Первые блюда' },
            { id: 'second-dish', name: 'Вторые блюда' },
            { id: 'side-dishes', name: 'Гарниры' },
            { id: 'vegan-desserts', name: 'Десерты' },
            { id: 'vegan-bakery', name: 'Выпечка' },
            { id: 'vegan-raw', name: 'Сыроедческие блюда' },
            { id: 'vegan-drinks', name: 'Напитки' },
        ],
    },
    {
        id: 'childish',
        name: 'Детские блюда',
        img: '/src/shared/assets/categories/childish.png',
        subCategories: [
            { id: 'kids-first', name: 'Первые блюда' },
            { id: 'kids-second', name: 'Вторые блюда' },
            { id: 'kids-side', name: 'Гарниры' },
            { id: 'kids-bakery', name: 'Выпечка' },
            { id: 'kids-gluten-free', name: 'Без глютена' },
            { id: 'kids-sugar-free', name: 'Без сахара' },
            { id: 'kids-allergen-free', name: 'Без аллергенов' },
            { id: 'kids-baby-food', name: 'Блюда для прикорма' },
        ],
    },
    {
        id: 'medicinal',
        name: 'Лечебное питание',
        img: '/src/shared/assets/categories/medicinal.svg',
        subCategories: [
            { id: 'kids-diet', name: 'Детская диета' },
            { id: 'diet-1', name: 'Диета №1' },
            { id: 'diet-2', name: 'Диета №2' },
            { id: 'diet-3', name: 'Диета №3' },
            { id: 'diet-5', name: 'Диета №5' },
            { id: 'diet-6', name: 'Диета №6' },
            { id: 'diet-7', name: 'Диета №7' },
            { id: 'diet-8', name: 'Диета №8' },
            { id: 'diet-9', name: 'Диета №9' },
            { id: 'diet-10', name: 'Диета №10' },
            { id: 'diet-11', name: 'Диета №11' },
            { id: 'diet-12', name: 'Диета №12' },
            { id: 'diet-13', name: 'Диета №13' },
            { id: 'diet-14', name: 'Диета №14' },
            { id: 'gluten-free', name: 'Без глютена' },
            { id: 'allergen-free', name: 'Без аллергенов' },
        ],
    },
    {
        id: 'national',
        name: 'Национальные',
        img: '/src/shared/assets/categories/national.png',
        subCategories: [
            { id: 'american', name: 'Американская кухня' },
            { id: 'armenian', name: 'Армянская кухня' },
            { id: 'greek', name: 'Греческая кухня' },
            { id: 'georgian', name: 'Грузинская кухня' },
            { id: 'italian', name: 'Итальянская кухня' },
            { id: 'spanish', name: 'Испанская кухня' },
            { id: 'chinese', name: 'Китайская кухня' },
            { id: 'mexican', name: 'Мексиканская кухня' },
            { id: 'panasian', name: 'Паназиатская кухня' },
            { id: 'russian', name: 'Русская кухня' },
            { id: 'turkish', name: 'Турецкая кухня' },
            { id: 'french', name: 'Французская кухня' },
            { id: 'swedish', name: 'Шведская кухня' },
            { id: 'japanese', name: 'Японская кухня' },
            { id: 'other-cuisine', name: 'Другая кухня' },
        ],
    },
    {
        id: 'sauces',
        name: 'Соусы',
        img: '/src/shared/assets/categories/sauces.png',
        subCategories: [
            { id: 'meat-sauces', name: 'Соусы мясные' },
            { id: 'cheese-sauces', name: 'Соусы сырные' },
            { id: 'marinades', name: 'Маринады' },
            { id: 'preserves', name: 'Домашние заготовки' },
            { id: 'meat-preserves', name: 'Мясные заготовки' },
            { id: 'fish-preserves', name: 'Рыбные заготовки' },
            { id: 'cucumber-preserves', name: 'Из огурцов' },
            { id: 'tomato-preserves', name: 'Из томатов' },
            { id: 'mushroom-preserves', name: 'Из грибов' },
            { id: 'vegetable-preserves', name: 'Овощные заготовки' },
            { id: 'salads-preserves', name: 'Салаты, икра' },
            { id: 'fruit-preserves', name: 'Из фруктов и ягод' },
        ],
    },
    {
        id: 'drinks',
        name: 'Напитки',
        img: '/src/shared/assets/categories/drinks.png',
        subCategories: [
            { id: 'juices', name: 'Соки и фреши' },
            { id: 'smoothies', name: 'Смузи' },
            { id: 'compotes', name: 'Компоты' },
            { id: 'kissels', name: 'Кисели' },
            { id: 'coffee', name: 'Кофе' },
            { id: 'tea', name: 'Лечебный чай' },
            { id: 'kvass', name: 'Квас' },
            { id: 'cocktails', name: 'Коктейли' },
            { id: 'alcohol', name: 'Алкогольные' },
        ],
    },
    {
        id: 'preserves',
        name: 'Заготовки',
        img: '/src/shared/assets/categories/preserves.png',
        subCategories: [
            { id: 'meat-preserves', name: 'Мясные заготовки' },
            { id: 'fish-preserves', name: 'Рыбные заготовки' },
            { id: 'cucumber-preserves', name: 'Из огурцов' },
            { id: 'tomato-preserves', name: 'Из томатов' },
            { id: 'mushroom-preserves', name: 'Из грибов' },
            { id: 'vegetable-preserves', name: 'Овощные заготовки' },
            { id: 'salads-preserves', name: 'Салаты, икра' },
            { id: 'fruit-preserves', name: 'Из фруктов и ягод' },
        ],
    },
];
