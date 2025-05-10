import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Image } from '@chakra-ui/react';

import { setSearchQuery } from '~/features/search';
import { useCustomNavigate } from '~/shared/hooks/useCustomNavigate';
import { useAppDispatch } from '~/store/hooks';

import { useBreadcrumbs } from '../model/useBreadcrumbs';

type TProps = {
    onClose?: () => void;
};

export function Breadcrumbs({ onClose = () => {} }: TProps) {
    const { category, categoryName, subcategory, subCategoryName, firstSubcategory, recipe } =
        useBreadcrumbs();
    const navigate = useCustomNavigate();
    const dispatch = useAppDispatch();

    function handleOnclick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) {
        e.preventDefault();
        dispatch(setSearchQuery(''));
        navigate(url);
        onClose();
    }

    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
            spacing={0}
            separator={<Image src='/src/shared/assets/breadcrumbArrow.svg' />}
            flexGrow={1}
            listProps={{ flexWrap: 'wrap' }}
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    onClick={(e) => handleOnclick(e, '/')}
                    href='/'
                    color={categoryName ? 'rgba(0, 0, 0, 0.64)' : '#000'}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {categoryName && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        onClick={(e) =>
                            handleOnclick(
                                e,
                                category === 'the-juiciest' || category === 'filters'
                                    ? `/${category}`
                                    : `/${category}/${firstSubcategory}`,
                            )
                        }
                        href={
                            category === 'the-juiciest' || category === 'filters'
                                ? `/${category}`
                                : `/${category}/${firstSubcategory}`
                        }
                        color={subCategoryName ? 'rgba(0, 0, 0, 0.64)' : '#000'}
                    >
                        {categoryName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {subCategoryName && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        onClick={(e) => handleOnclick(e, `/${category}/${subcategory}`)}
                        href={`/${category}/${subcategory}`}
                        color={recipe ? 'rgba(0, 0, 0, 0.64)' : '#000'}
                    >
                        {subCategoryName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {recipe && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        onClick={(e) =>
                            handleOnclick(e, `/${category}/${subcategory}/${recipe.title}`)
                        }
                        href={`/${category}/${subcategory}/${recipe.title}`}
                        color='#000'
                    >
                        {recipe.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
}
