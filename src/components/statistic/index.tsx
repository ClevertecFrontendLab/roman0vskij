import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import StatisticButton from './statisticButton';

export default function Statistic() {
    const [isLargerThan1440] = useMediaQuery('(min-width: 1440px)');

    const mockData = [
        { value: 185, img: 'favourite' },
        { value: 589, img: 'people' },
        { value: 587, img: 'smile' },
    ];

    return (
        <Box>
            <Flex direction={isLargerThan1440 ? 'column' : 'row'} px={2}>
                {mockData.map((elem) => (
                    <StatisticButton img={elem.img} value={elem.value} />
                ))}
            </Flex>
        </Box>
    );
}
