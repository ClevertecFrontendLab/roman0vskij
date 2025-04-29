import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Image,
    Show,
    Text,
} from '@chakra-ui/react';

import { useCustomNavigate } from '~/shared/hooks/useCustomNavigate';
import { TMock } from '~/shared/types';
import { CardStatistic } from '~/shared/ui/cardStatistic';

export function RecipeCard(props: TMock) {
    const navigate = useCustomNavigate();

    function handleOnclick() {
        navigate(`/${props.category[0]}/${props.subcategory[0]}/${props.id}`);
    }

    return (
        <Card
            onClick={handleOnclick}
            w={[158, null, null, 277, 322]}
            h={[220, null, null, 402, 414]}
            borderRadius={8}
            bgColor='#fff'
            border='1px solid rgba(0, 0, 0, 0.08)'
            variant='none'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
        >
            <Image
                position='relative'
                h={{ base: 128, lg: 230 }}
                objectFit='cover'
                src={props.image}
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
                    {props.title}
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
                        {props.description}
                    </Text>
                </CardBody>
            </Show>

            <CardFooter
                px={[2, null, null, 3, 6]}
                pt={{ base: 2, lg: 6 }}
                pb={[1, null, null, 3, 5]}
                justify='space-between'
            >
                {/* <Show above='lg'>
                    {props?.hasTag ? (
                        <Tag bgClr='#d7ff94' tagName={props?.tag} img={props?.tagImg} />
                    ) : (
                        <Box />
                    )}
                </Show>
                <Hide above='lg'>
                    <Box position='absolute' top={2} left={2} w='100%'>
                        {props?.hasTag ? (
                            <Tag bgClr='#d7ff94' tagName={props?.tag} img={props?.tagImg} />
                        ) : (
                            <Box />
                        )}
                    </Box>
                </Hide> */}
                <CardStatistic bookmarks={props.bookmarks} likes={props.likes} />
            </CardFooter>
        </Card>
    );
}
