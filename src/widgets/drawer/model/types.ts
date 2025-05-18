export enum GROUP {
    CATEGORIES = 'categories',
    AUTHORS = 'authors',
    MEAT = 'meat',
    SIDE = 'side',
    ALLERGENS = 'allergens',
}

export type FilterTag = {
    label: string;
    group: GROUP;
};
