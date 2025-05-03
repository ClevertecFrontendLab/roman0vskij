export type TStep = {
    stepNumber: string;
    description: string;
    image: string;
};

export type TIngredient = {
    title: string;
    count: number;
    measureUnit: string;
};

export type TRecipe = {
    _id: string;
    createdAt: string;
    title: string;
    description: string;
    time: number;
    image: string;
    likes: number;
    bookmarks: number;
    views: number;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: TStep[];
    nutritionValue: {
        calories: number;
        protein: number;
        fats: number;
        carbohydrates: number;
    };
    ingredients: TIngredient[];
};
