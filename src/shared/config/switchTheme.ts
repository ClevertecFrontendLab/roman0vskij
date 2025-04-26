import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    switchAnatomy.keys,
);

const baseStyle = definePartsStyle({
    track: {
        bg: 'rgba(0, 0, 0, 0.16)',
        _checked: {
            bg: '#b1ff2e',
        },
    },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });
