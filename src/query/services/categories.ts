import { TCategory, TSubCategory } from '~/entities/category';
import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';

export const categoriesApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.CATEGORIES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getCategories: builder.query<TCategory[], void>({
                query: () => ({
                    url: ApiEndpoints.CATEGORIES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORIES,
                    name: EndpointNames.GET_CATEGORIES,
                }),
                transformResponse: (response: (TCategory | TSubCategory)[]) =>
                    response.filter((elem): elem is TCategory => 'subCategories' in elem),
                providesTags: [Tags.CATEGORIES],
            }),
            getCategory: builder.query<TCategory, string>({
                query: (id) => ({
                    url: ApiEndpoints.CATEGORIES + '/' + id,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORIES,
                    name: EndpointNames.GET_CATEGORIES,
                }),
                providesTags: [Tags.CATEGORIES],
            }),
        }),
    });

export const { useGetCategoriesQuery, useLazyGetCategoriesQuery, useGetCategoryQuery } =
    categoriesApiSlice;
