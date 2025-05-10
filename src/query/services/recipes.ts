import { TRecipe } from '~/entities/recipe';
import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';

type TResponse = {
    data: TRecipe[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

type TParams = {
    page?: number;
    limit?: number;
    allergens?: string;
    searchString?: string;
    meat?: string;
    garnish?: string;
    subcategoriesIds?: string;
    sortBy?: 'createdAt' | 'likes';
    sortOrder?: 'ASC' | 'DESC';
};

export const recipesApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<TResponse, TParams | void>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                    params: params ?? undefined,
                }),
                providesTags: [Tags.RECIPES],
            }),
            getRecipesBySubcategory: builder.query<
                TResponse,
                { subcategoryId: string; params?: TParams }
            >({
                query: ({ subcategoryId, params }) => ({
                    url: ApiEndpoints.RECIPES + ApiEndpoints.CATEGORIES + '/' + subcategoryId,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES_BY_SUBCATEGORY,
                    params: params ?? undefined,
                }),
                providesTags: [Tags.RECIPES],
            }),
            getRecipe: builder.query<TRecipe, string>({
                query: (id) => ({
                    url: ApiEndpoints.RECIPES + '/' + id,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPE,
                }),
                providesTags: [Tags.RECIPES],
            }),
        }),
    });

export const {
    useGetRecipesQuery,
    useLazyGetRecipesQuery,
    useLazyGetRecipesBySubcategoryQuery,
    useGetRecipeQuery,
    useLazyGetRecipeQuery,
} = recipesApiSlice;
