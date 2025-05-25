import {
    Accordion as AccordionWrapper,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Image,
    Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { selectCategories } from '~/entities/category';
import { ApiBaseURL } from '~/query/constants/base';
import { CloseArrowIcon, OpenArrowIcon } from '~/shared/assets/icons';
import { useCustomNavigate } from '~/shared/hooks/useCustomNavigate';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setSearchQuery } from '~/widgets/drawer';

type TProps = {
    isMobile?: boolean;
};

export function Accordion({ isMobile = false }: TProps) {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useCustomNavigate();
    const categories = useAppSelector(selectCategories);

    const [_, selectedCategory, selectedSubCategory] = location.pathname.split('/');

    function onClickHandler(category: string, subCategory: string) {
        dispatch(setSearchQuery(''));
        navigate(`/${category}/${subCategory}`);
    }

    const [expandedIndexes, setExpandedIndexes] = useState<number>(-1);

    const isAnyOpen = expandedIndexes >= 0;

    const handleAccordionChange = (indexes: number) => {
        setExpandedIndexes(indexes);
    };

    return (
        <AccordionWrapper
            allowToggle
            w='100%'
            variant='colorful'
            overflowY='auto'
            onChange={handleAccordionChange}
            boxShadow={
                !isMobile && isAnyOpen
                    ? '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    : 'none'
            }
            borderRadius={isAnyOpen ? 12 : 0}
        >
            {categories.map((category) => (
                <AccordionItem
                    key={category._id}
                    data-test-id={
                        category.category === 'vegan' ? 'vegan-cuisine' : category.category
                    }
                >
                    {({ isExpanded }) => (
                        <>
                            <h2>
                                <AccordionButton
                                    onClick={() =>
                                        onClickHandler(
                                            category.category,
                                            category.subCategories[0].category,
                                        )
                                    }
                                    _hover={{ bgColor: '#ffffd3' }}
                                >
                                    <Image src={ApiBaseURL.IMG_URL + category.icon} />
                                    <Box flex='1' textAlign='left' w='100%'>
                                        {category.title}
                                    </Box>
                                    {isExpanded ? <CloseArrowIcon /> : <OpenArrowIcon />}
                                </AccordionButton>
                            </h2>
                            <AccordionPanel display='flex' flexDirection='column'>
                                {category.subCategories.map((subcategory) => (
                                    <Link
                                        data-test-id={
                                            selectedCategory === category.category &&
                                            selectedSubCategory === subcategory.category
                                                ? `${subcategory.category}-active`
                                                : ''
                                        }
                                        onClick={() =>
                                            onClickHandler(category.category, subcategory.category)
                                        }
                                        pos='relative'
                                        display='flex'
                                        alignItems='center'
                                        key={subcategory._id}
                                        fontSize={16}
                                        lineHeight='150%'
                                        fontWeight={500}
                                        color='#000'
                                        _hover={{
                                            bgColor: ' #ffffd3',
                                            _before: {
                                                display: 'none',
                                            },
                                        }}
                                        h={9}
                                        pl='52px'
                                        _before={
                                            selectedCategory === category.category &&
                                            selectedSubCategory === subcategory.category
                                                ? {
                                                      content: '""',
                                                      pos: 'absolute',
                                                      bgColor: '#c4ff61',
                                                      w: 2,
                                                      h: 7,
                                                      left: '40px',
                                                  }
                                                : {
                                                      content: '""',
                                                      pos: 'absolute',
                                                      bgColor: '#c4ff61',
                                                      w: '1px',
                                                      h: 6,
                                                      left: '40px',
                                                  }
                                        }
                                    >
                                        {subcategory.title}
                                    </Link>
                                ))}
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            ))}
        </AccordionWrapper>
    );
}
