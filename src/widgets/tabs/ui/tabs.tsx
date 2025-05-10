import { Box, HStack, Tab, TabIndicator, TabList, Tabs as TabsWrapper } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { selectCategories, TCategory } from '~/entities/category';
import { useCustomNavigate } from '~/shared/hooks/useCustomNavigate';
import { useAppSelector } from '~/store/hooks';

export function Tabs() {
    const location = useLocation();
    const navigate = useCustomNavigate();
    const categories = useAppSelector(selectCategories);

    const [_, selectedCategory, selectedSubcategory] = location.pathname.split('/');
    let category = categories.find((tab) => tab.category === selectedCategory) as TCategory;
    const [subcategoryIndex, setSubcategoryIndex] = useState(
        category.subCategories.findIndex(
            (subCategory) => subCategory.category === selectedSubcategory,
        ),
    );

    function onClickHandler(category: string, subCategory: string) {
        navigate(`/${category}/${subCategory}`);
    }

    useEffect(() => {
        const [_, selectedCategory, selectedSubcategory] = location.pathname.split('/');
        category = categories.find((tab) => tab.category === selectedCategory) as TCategory;
        setSubcategoryIndex(
            category.subCategories.findIndex(
                (subCategory) => subCategory.category === selectedSubcategory,
            ),
        );
    }, [location]);

    return (
        <HStack pos='relative' justify='center' overflow='hidden' gap={0}>
            <TabsWrapper
                key={category.category}
                variant='colorful'
                index={subcategoryIndex}
                w='100%'
            >
                <Box
                    overflowX={{ base: 'auto', lg: 'visible' }}
                    whiteSpace={{ base: 'nowrap', lg: 'normal' }}
                    display='flex'
                    sx={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        scrollbarWidth: 'none',
                    }}
                >
                    <TabList
                        minW={{ base: 'max-content', lg: 'auto' }}
                        mx='auto'
                        flexWrap={{ lg: 'wrap' }}
                        justifyContent={{ lg: 'center' }}
                    >
                        {category.subCategories.map((subcategory, i) => (
                            <Tab
                                aria-selected={subcategoryIndex === i ? true : false}
                                data-test-id={`tab-${subcategory.category}-${i}`}
                                key={subcategory.category}
                                onClick={() =>
                                    onClickHandler(category.category, subcategory.category)
                                }
                            >
                                {subcategory.title}
                            </Tab>
                        ))}
                    </TabList>
                </Box>
                <TabIndicator />
            </TabsWrapper>
        </HStack>
    );
}
