import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tabsAnatomy.keys,
);
const colorfulVariant = definePartsStyle(() => ({
    tab: {
        color: '#134b00',
        _selected: {
            color: '#2db100',
        },
    },
    indicator: {
        mt: '-2px',
        height: '2px',
        bg: '#2db100',
    },
}));
const variants = {
    colorful: colorfulVariant,
};
const tabsTheme = defineMultiStyleConfig({ variants });

export default tabsTheme;
