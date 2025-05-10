import { Box, Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';

import { selectRandomCategory } from '~/entities/category';
import { TRecipe } from '~/entities/recipe';
import { ApiBaseURL } from '~/query/constants/base';
import { CardStatistic } from '~/shared/ui/cardStatistic';
import { Tag } from '~/shared/ui/tag';
import { useAppSelector } from '~/store/hooks';

export function RelevantRecipeCard(props: TRecipe) {
    const randomCategory = useAppSelector(selectRandomCategory);

    return (
        <Card
            w='100%'
            h={{ base: 168, lg: 180, xl: 192 }}
            borderRadius={8}
            bgColor='#fff'
            overflow='hidden'
            border='1px solid rgba(0, 0, 0, 0.08)'
            variant='none'
            px={{ base: 3, lg: 4, xl: 6 }}
            pt={{ base: 3, lg: 4, xl: 6 }}
            pb={{ base: 3, lg: 4, xl: 5 }}
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
        >
            <CardHeader p={0} mb={2}>
                <Heading
                    fontSize={{ base: 16, lg: 20 }}
                    fontWeight={500}
                    lineHeight={{ base: '150%', lg: '140%' }}
                    color='#000'
                    wordBreak='break-all'
                    noOfLines={1}
                >
                    {props.title}
                </Heading>
            </CardHeader>
            <CardBody p={0} mb={6} maxH={24} overflow='hidden'>
                <Text
                    fontSize={14}
                    fontWeight={400}
                    lineHeight='143%'
                    color='#000'
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {props.description}
                </Text>
            </CardBody>
            <CardFooter p={0} justify='space-between'>
                {randomCategory ? (
                    <Tag
                        bgClr='#ffffd3'
                        isRelevant
                        img={ApiBaseURL.IMG_URL + randomCategory.icon}
                        title={randomCategory.title}
                    />
                ) : (
                    <Box />
                )}
                <CardStatistic bookmarks={props.bookmarks} likes={props.likes} />
            </CardFooter>
        </Card>
    );
}
