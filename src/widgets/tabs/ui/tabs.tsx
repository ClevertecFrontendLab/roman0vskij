import { Box, HStack, Tab, TabIndicator, TabList, Tabs as TabsWrapper } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { TCategory } from '~/entities/category';
import { mockCategories } from '~/shared/mock/mockCategories';

export function Tabs() {
    const location = useLocation();
    const navigate = useNavigate();

    const [_, selectedCategory, selectedSubcategory] = location.pathname.split('/');
    let category = mockCategories.find((tab) => tab.id === selectedCategory) as TCategory;
    const [subcategoryIndex, setSubcategoryIndex] = useState(
        category.subCategories.findIndex((subCategory) => subCategory.id === selectedSubcategory),
    );

    function onClickHandler(category: string, subCategory: string) {
        navigate(`/${category}/${subCategory}`);
    }

    useEffect(() => {
        const [_, selectedCategory, selectedSubcategory] = location.pathname.split('/');
        category = mockCategories.find((tab) => tab.id === selectedCategory) as TCategory;
        setSubcategoryIndex(
            category.subCategories.findIndex(
                (subCategory) => subCategory.id === selectedSubcategory,
            ),
        );
    }, [location]);

    return (
        <HStack pos='relative' justify='center' overflow='hidden' gap={0}>
            <TabsWrapper key={category.id} variant='colorful' index={subcategoryIndex} w='100%'>
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
