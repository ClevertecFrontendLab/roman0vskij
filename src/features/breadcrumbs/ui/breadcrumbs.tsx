import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useBreadcrumbs } from '../model/useBreadcrumbs';

type TProps = {
    isMobile?: boolean;
    onClose?: () => void;
};

export function Breadcrumbs({ isMobile = false, onClose = () => {} }: TProps) {
    const { category, categoryName, subcategory, subCategoryName, firstSubcategory, recipe } =
        useBreadcrumbs();
    const navigate = useNavigate();

    function handleOnclick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) {
        e.preventDefault();
        navigate(url);
        onClose();
    }

    return (
        <Breadcrumb
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
                                category === 'juiciest'
                                    ? `/${category}`
                                    : `/${category}/${firstSubcategory}`,
                            )
                        }
                        href={
                            category === 'juiciest'
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
                    {isMobile && <BreadcrumbSeparator />}
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
                            handleOnclick(e, `/${category}/${subcategory}/${recipe.id}`)
                        }
                        href={`/${category}/${subcategory}/${recipe.id}`}
                        color='#000'
                    >
                        {recipe.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
}
