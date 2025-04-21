import { Box, HStack, Tab, TabIndicator, TabList, Tabs as TabsWrapper } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { TCategory } from '~/entities/category';
import { mockCategories } from '~/shared/mock/mockCategories';

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
        <HStack pos='relative' justify='center' overflow='hidden' h={12} gap={0}>
            <TabsWrapper
                key={category.id}
                variant='colorful'
                defaultIndex={subCategoryIndex}
                w='100%'
            >
                <Box
                    overflowX='auto'
                    whiteSpace='nowrap'
                    display='flex'
                    sx={{
                        '&::-webkit-scrollbar': {
                            display: { base: 'none', lg: 'initial' },
                        },
                        scrollbarWidth: {
                            base: 'none',
                            lg: 'auto',
                        },
                    }}
                >
                    <TabList minW='max-content' mx='auto'>
                        {category.subCategories.map((subCategory) => (
                            <Tab
                                key={subCategory.id}
                                onClick={() => onClickHandler(category.id, subCategory.id)}
                            >
                                {subCategory.name}
                            </Tab>
                        ))}
                    </TabList>
                </Box>
                <TabIndicator />
            </TabsWrapper>
        </HStack>
    );
}
