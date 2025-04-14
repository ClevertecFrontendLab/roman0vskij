import { Tab, TabIndicator, TabList, Tabs as TabsWrapper } from '@chakra-ui/react';

import { mockCategories, TCategory } from '~/shared/mock/mockCategories';

export default function Tabs() {
    const selectedCategory = 'vegan';
    const selectedSubCategory = 'vegan-second';
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
                    <Tab key={subCategory.id}>{subCategory.name}</Tab>
                ))}
            </TabList>
            <TabIndicator />
        </TabsWrapper>
    );
}
