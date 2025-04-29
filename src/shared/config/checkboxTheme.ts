import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    checkboxAnatomy.keys,
);

const baseStyle = definePartsStyle({
    control: {
        width: '12px',
        height: '12px',
        borderRadius: '2px',
        '&[data-checked]': {
            bg: '#b1ff2e',
            borderColor: '#b1ff2e',
        },
        '& .chakra-icon': {
            opacity: 0,
        },
        '&[data-checked] .chakra-icon': {
            opacity: 1,
        },
        zIndex: 2,
        outline: 'none',
    },
});
export const checkboxTheme = defineMultiStyleConfig({ baseStyle });
