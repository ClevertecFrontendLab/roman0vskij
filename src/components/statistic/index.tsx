import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import StatisticItem from './statisticItem';

export default function Statistic() {
    const [isLargerThan1440] = useMediaQuery('(min-width: 1440px)');

    const mockData = [
        { value: 185, img: 'save' },
        { value: 589, img: 'people' },
        { value: 587, img: 'smile' },
    ];

    return (
        <Box w='fit-content'>
            <Flex
                direction={isLargerThan1440 ? 'column' : 'row'}
                py={{ lg: 4 }}
                px={[2, null, 4]}
                gap={{ lg: 6 }}
            >
                {mockData.map((elem) => (
                    <StatisticItem key={elem.img} img={elem.img} value={elem.value} />
                ))}
            </Flex>
        </Box>
    );
}
