export type TSubCategory = {
    id: string;
    name: string;
};

export type TCategory = {
    id: string;
    name: string;
    img: string;
    subCategories: TSubCategory[];
};
