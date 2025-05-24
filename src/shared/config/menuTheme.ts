import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    menuAnatomy.keys,
);

const baseStyle = definePartsStyle({
    button: {
        '& > span': {
            display: 'flex',
            flexDir: 'row',
            flexWrap: 'wrap',
            gap: 2,
        },
    },
    list: {
        '& > .chakra-menu__group > *:nth-of-type(odd)': {
            background: 'rgba(0, 0, 0, 0.06)',
        },
        '& > .chakra-menu__group > *:last-child': {
            background: '#fff',
            py: 2,
            pl: 6,
            pr: 2,
        },
    },
    item: {
        '&[aria-checked=false] > .chakra-menu__icon-wrapper': {
            w: 3,
            h: 3,
            border: '2px solid #d7ff94',
            borderRadius: 2,
            bg: 'transparent',
            opacity: 1,
            '& > *': {
                opacity: 0,
            },
        },
        '&[aria-checked=true] > .chakra-menu__icon-wrapper': {
            w: 3,
            h: 3,
            bg: '#b1ff2e',
            borderRadius: 2,
            border: '1px solid #b1ff2e',
        },
        '&:hover': {
            bg: 'transparent',
        },
    },
});

export const menuTheme = defineMultiStyleConfig({ baseStyle });
