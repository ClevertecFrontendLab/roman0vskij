import {
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Hide,
    Image,
    Show,
    Text,
} from '@chakra-ui/react';

import CardStatistic from '../cardStatistic';
import Tag from '../tag';

type TRecipe = {
    img: string;
    title: string;
    text: string;
    hasTag: boolean;
    tag: string;
    tagSvg: string;
    saves: number;
    smiles: number;
};

export default function RecipeCard({
    img,
    title,
    text,
    hasTag,
    tag,
    tagSvg,
    saves,
    smiles,
}: TRecipe) {
    // const [isLargerThan1440] = useMediaQuery('(min-width: 1440px)');
    return (
        <Card
            w={[158, null, null, 277, 322]}
            h={[220, null, null, 402, 414]}
            borderRadius={8}
            bgColor='#fff'
            overflow='hidden'
        >
            <Image
                position='relative'
                h={{ base: 128, lg: 230 }}
                objectFit='cover'
                src={img}
                alt='recipe'
                borderTopRadius={8}
            />
            <CardHeader px={[2, null, null, 3, 6]} pt={[2, null, null, 3, 4]} pb={0}>
                <Heading
                    fontSize={[16, null, null, 18, 20]}
                    fontWeight={500}
                    lineHeight={['150%', null, null, '156%', '140%']}
                    color='#000'
                    sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: { base: 2, lg: 1 },
                    }}
                >
                    {title}
                </Heading>
            </CardHeader>
            <Show above='lg'>
                <CardBody px={[2, null, null, 3, 6]} pt={2} pb={0} maxH={24} overflow='hidden'>
                    <Text
                        fontWeight={400}
                        fontSize={14}
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
            </Show>

            <CardFooter
                px={[2, null, null, 3, 6]}
                pt={{ base: 2, lg: 6 }}
                pb={[1, null, null, 3, 5]}
                justify='space-between'
            >
                <Show above='lg'>
                    {hasTag ? <Tag bgClr='#d7ff94' tagName={tag} img={tagSvg} /> : <Box />}
                </Show>
                <Hide above='lg'>
                    <Box position='absolute' top={2} left={2} w='100%'>
                        {hasTag ? <Tag bgClr='#d7ff94' tagName={tag} img={tagSvg} /> : <Box />}
                    </Box>
                </Hide>
                <CardStatistic saves={saves} smiles={smiles} />
            </CardFooter>
        </Card>
    );
}
