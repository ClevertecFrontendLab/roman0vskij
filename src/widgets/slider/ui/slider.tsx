import 'swiper/swiper-bundle.css';

import { Box, IconButton, useMediaQuery } from '@chakra-ui/react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { RecipeCard } from '~/entities/recipeCard';
import { LeftArrowIcon, RightArrowIcon } from '~/shared/assets/icons';
import { mockRecipes } from '~/shared/mock/mockRecipes';

export function Slider() {
    const [isLargerThan1920] = useMediaQuery('(min-width: 1920px)');
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

    return (
        <Box pos='relative'>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: '.custom-prev',
                    nextEl: '.custom-next',
                }}
                loop
                slidesPerView='auto'
                spaceBetween={isLargerThan1920 ? '24px' : '12px'}
                style={{
                    marginTop: isLargerThan1200 ? '24px' : '12px',
                    paddingBottom: '12px',
                }}
            >
                {mockRecipes.map((recipe, i) => (
                    <SwiperSlide key={`recipe${i}`} style={{ width: 'max-content' }}>
                        <RecipeCard {...recipe} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <IconButton
                display={{ base: 'none', lg: 'flex' }}
                className='custom-prev'
                key='previous button'
                bgColor='#000'
                w={{ base: 10, xl: 12 }}
                h={{ base: 10, xl: 12 }}
                pos='absolute'
                top='147px'
                left={-2}
                zIndex={2}
                borderRadius={6}
                aria-label='previous button'
                icon={
                    <LeftArrowIcon w={{ base: 4, xl: 6 }} h={{ base: 4, xl: 6 }} fill='#ffffd3' />
                }
                variant='none'
                sx={{
                    '&.swiper-button-disabled': {
                        opacity: 1,
                    },
                    '&:hover:disabled': {
                        background: '#000',
                    },
                }}
            />
            <IconButton
                display={{ base: 'none', lg: 'flex' }}
                className='custom-next'
                key='next button'
                bgColor='#000'
                w={{ base: 10, xl: 12 }}
                h={{ base: 10, xl: 12 }}
                pos='absolute'
                top='147px'
                right={-2}
                zIndex={2}
                borderRadius={6}
                aria-label='next button'
                icon={
                    <RightArrowIcon w={{ base: 4, xl: 6 }} h={{ base: 4, xl: 6 }} fill='#ffffd3' />
                }
                variant='none'
                sx={{
                    '&.swiper-button-disabled': {
                        opacity: 1,
                    },
                    '&:hover:disabled': {
                        background: '#000',
                    },
                }}
            />
        </Box>
    );
}
