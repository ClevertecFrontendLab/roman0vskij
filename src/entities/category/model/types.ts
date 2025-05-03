export type TSubCategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};

export type TCategory = {
    _id: string;
    title: string;
    description: string;
    category: string;
    icon: string;
    subCategories: TSubCategory[];
};
