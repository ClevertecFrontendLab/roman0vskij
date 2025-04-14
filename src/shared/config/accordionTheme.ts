import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    accordionAnatomy.keys,
);
const colorfulVariant = definePartsStyle(() => ({
    root: {
        paddingLeft: '10px',
    },
    button: {
        display: 'flex',
        gap: 3,
        fontSize: 16,
        lineHeight: '150%',
        fontWeight: 500,
        color: '#000',
        _expanded: { bg: '#eaffc7', fontWeight: 700 },
        padding: '0 8px',
        height: 12,
    },
    container: {
        minHeight: 12,
        border: 'none',
    },
    panel: {
        bgColor: 'transparent',
        textAlign: 'left',
        p: 0,
    },
}));
const variants = {
    colorful: colorfulVariant,
};
const accordionTheme = defineMultiStyleConfig({ variants });

export default accordionTheme;
