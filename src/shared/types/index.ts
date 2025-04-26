export type TIngredient = {
    title: string;
    count: string;
    measureUnit: string;
};

export type TStep = {
    stepNumber: number;
    description: string;
    image: string;
};

export type TMock = {
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions: number;
    nutritionValue: { calories: number; proteins: number; fats: number; carbohydrates: number };
    ingredients: TIngredient[];
    steps: TStep[];
};
