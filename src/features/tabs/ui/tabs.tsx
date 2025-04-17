import { Tab, TabIndicator, TabList, Tabs as TabsWrapper } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { mockCategories, TCategory } from '~/shared/mock/mockCategories';

export function Tabs() {
    const location = useLocation();
    const navigate = useNavigate();

    const [_, selectedCategory, selectedSubCategory] = location.pathname.split('/');

    function onClickHandler(category: string, subCategory: string) {
        navigate(`/${category}/${subCategory}`);
    }
    const category: TCategory = mockCategories.find(
        (tab) => tab.id === selectedCategory,
    ) as TCategory;
    const subCategoryIndex = category.subCategories.findIndex(
        (subCategory) => subCategory.id === selectedSubCategory,
    );

    return (
        <TabsWrapper variant='colorful' defaultIndex={subCategoryIndex}>
            <TabList>
                {category.subCategories.map((subCategory) => (
                    <Tab
                        key={subCategory.id}
                        onClick={() => onClickHandler(category.id, subCategory.id)}
                    >
                        {subCategory.name}
                    </Tab>
                ))}
            </TabList>
            <TabIndicator />
        </TabsWrapper>
    );
}
