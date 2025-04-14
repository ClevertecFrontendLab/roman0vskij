import { Box, Flex } from '@chakra-ui/react';

import StatisticItem from './statisticItem';

export default function Statistic() {
    const mockData = [
        { value: 185, img: 'save' },
        { value: 589, img: 'people' },
        { value: 587, img: 'smile' },
    ];

    return (
        <Box w='fit-content'>
            <Flex
                direction={{ base: 'row', lg: 'column' }}
                py={{ lg: 4 }}
                px={{ base: 2, md: 4, lg: 0 }}
                gap={{ lg: 6 }}
            >
                {mockData.map((elem) => (
                    <StatisticItem key={elem.img} img={elem.img} value={elem.value} />
                ))}
            </Flex>
        </Box>
    );
}
