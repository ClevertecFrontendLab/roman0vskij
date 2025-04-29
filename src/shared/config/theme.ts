import { extendTheme } from '@chakra-ui/react';

import { accordionTheme } from './accordionTheme';
import { checkboxTheme } from './checkboxTheme';
import { inputTheme } from './inputTheme';
import { menuTheme } from './menuTheme';
import { switchTheme } from './switchTheme';
import { tableTheme } from './tableTheme';
import { tabsTheme } from './tabsTheme';

const breakpoints = {
    base: '0px',
    sm: '360px',
    md: '768px',
    lg: '1200px',
    xl: '1920px',
    '2xl': '2000px',
};
const fonts = {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
};

export const theme = extendTheme({
    breakpoints,
    fonts,
    components: {
        Tabs: tabsTheme,
        Accordion: accordionTheme,
        Table: tableTheme,
        Switch: switchTheme,
        Input: inputTheme,
        Menu: menuTheme,
        Checkbox: checkboxTheme,
    },
    styles: {
        global: {
            '*': {
                scrollbarWidth: '8px',
                scrollbarColor: 'rgba(0, 0, 0, 0.16)',
            },
            '::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.16)',
                borderRadius: '4px',
            },
            '::-webkit-scrollbar-track': {
                background: 'rgba(0, 0, 0, 0.04)',
            },
            '::-webkit-scrollbar-button': {
                display: 'none',
                width: 0,
                height: 0,
            },
            body: {
                scrollbarWidth: 0,
                '::-webkit-scrollbar': {
                    width: 0,
                    height: 0,
                },
            },
        },
    },
});
