import 'swiper/swiper-bundle.css';

import { Box, IconButton, useMediaQuery } from '@chakra-ui/react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { RecipeCard } from '~/entities/recipeCard';
import { LeftArrowIcon, RightArrowIcon } from '~/shared/assets/icons';
import { mockData } from '~/shared/mock/mockData';

export function Slider() {
    const [isLargerThan1920] = useMediaQuery('(min-width: 1920px)');
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

    const mock = mockData
        .map((e) => ({ ...e, date: new Date(e.date) }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((e) => ({ ...e, date: e.date.toISOString() }))
        .slice(0, 10);

    return (
        <Box pos='relative'>
            <Swiper
                data-test-id='carousel'
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
                {mock.map((recipe, i) => (
                    <SwiperSlide
                        data-test-id={`carousel-card-${i}`}
                        key={`recipe${i}`}
                        style={{ width: 'max-content' }}
                    >
                        <RecipeCard {...recipe} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <IconButton
                data-test-id='carousel-back'
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
                data-test-id='carousel-forward'
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
