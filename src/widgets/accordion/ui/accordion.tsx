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

import { CloseArrowIcon, OpenArrowIcon } from '~/shared/assets/icons';
import { useCustomNavigate } from '~/shared/hooks/useCustomNavigate';
import { mockCategories } from '~/shared/mock/mockCategories';

type TProps = {
    isMobile?: boolean;
};

export function Accordion({ isMobile = false }: TProps) {
    const location = useLocation();
    const navigate = useCustomNavigate();

    const [_, selectedCategory, selectedSubCategory] = location.pathname.split('/');

    function onClickHandler(category: string, subCategory: string) {
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
            {mockCategories.map((category) => (
                <AccordionItem
                    key={category.id}
                    data-test-id={category.id === 'vegan' ? 'vegan-cuisine' : category.id}
                >
                    {({ isExpanded }) => (
                        <>
                            <h2>
                                <AccordionButton
                                    onClick={() =>
                                        onClickHandler(category.id, category.subCategories[0].id)
                                    }
                                    _hover={{ bgColor: '#ffffd3' }}
                                >
                                    <Image src={category.img} />
                                    <Box flex='1' textAlign='left' w='100%'>
                                        {category.name}
                                    </Box>
                                    {isExpanded ? <CloseArrowIcon /> : <OpenArrowIcon />}
                                </AccordionButton>
                            </h2>
                            <AccordionPanel display='flex' flexDirection='column'>
                                {category.subCategories.map((subcategory) => (
                                    <Link
                                        data-test-id={
                                            selectedCategory === category.id &&
                                            selectedSubCategory === subcategory.id
                                                ? `${subcategory.id}-active`
                                                : ''
                                        }
                                        onClick={() => onClickHandler(category.id, subcategory.id)}
                                        pos='relative'
                                        display='flex'
                                        alignItems='center'
                                        key={subcategory.id}
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
                                            selectedCategory === category.id &&
                                            selectedSubCategory === subcategory.id
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
                                        {subcategory.name}
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
