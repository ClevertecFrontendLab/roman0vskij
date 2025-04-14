import { Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';

import { TRelevantRecipe } from '~/shared/mock/mockRelevantRecipes';

import CardStatistic from '../cardStatistic';
import Tag from '../tag';

export default function RelevantRecipeCard({
    title,
    text,
    hasTag,
    tag = '',
    tagImg = '',
    saves,
    smiles,
}: TRelevantRecipe) {
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
                    {title}
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
                    {text}
                </Text>
            </CardBody>
            <CardFooter p={0} justify='space-between'>
                {hasTag ? <Tag bgClr='#ffffd3' tagName={tag} img={tagImg} isRelevant /> : <></>}
                <CardStatistic saves={saves} smiles={smiles} />
            </CardFooter>
        </Card>
    );
}
