import 'swiper/swiper-bundle.css';

import { Box, IconButton, useMediaQuery } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { RecipeCard } from '~/entities/recipeCard';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { LeftArrowIcon, RightArrowIcon } from '~/shared/assets/icons';
import { setAppError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export function Slider() {
    const [isLargerThan1920] = useMediaQuery('(min-width: 1920px)');
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
    const dispatch = useAppDispatch();
    const { data, isFetching, isSuccess, isError, error } = useGetRecipesQuery({
        sortBy: 'createdAt',
        sortOrder: 'DESC',
        limit: 10,
    });

    useEffect(() => {
        dispatch(setAppLoader(isFetching));

        if (isError) {
            dispatch(setAppError(error));
        }
    }, [isFetching, isError]);

    return (
        isSuccess &&
        data?.data && (
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
                    {data.data.map((recipe, i) => (
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
                        <LeftArrowIcon
                            w={{ base: 4, xl: 6 }}
                            h={{ base: 4, xl: 6 }}
                            fill='#ffffd3'
                        />
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
                        <RightArrowIcon
                            w={{ base: 4, xl: 6 }}
                            h={{ base: 4, xl: 6 }}
                            fill='#ffffd3'
                        />
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
        )
    );
}
