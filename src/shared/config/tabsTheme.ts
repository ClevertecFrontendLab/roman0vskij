import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tabsAnatomy.keys,
);
const colorfulVariant = definePartsStyle(() => ({
    tab: {
        color: '#134b00',
        borderTop: '1px solid transparent',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        _selected: {
            color: '#2db100',
            borderTop: 'none',
            borderBottom: '2px solid #2db100',
        },
    },
    indicator: {
        display: 'none',
    },
}));
const variants = {
    colorful: colorfulVariant,
};
export const tabsTheme = defineMultiStyleConfig({ variants });
