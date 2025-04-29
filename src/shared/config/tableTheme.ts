import { tableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tableAnatomy.keys,
);

const colorfulVariant = definePartsStyle(() => ({
    th: {
        '&[data-is-numeric=true]': {
            textAlign: 'end',
            px: 0,
        },
        fontWeight: 700,
        fontSize: 12,
        lineHeight: '133%',
        letterSpacing: '0.05em',
        color: '#2db100',
        py: 2,
        px: 6,
    },
    td: {
        '&[data-is-numeric=true]': {
            textAlign: 'end',
            fontWeight: 400,
        },
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '143%',
        color: 'rgba(0, 0, 0, 0.92)',
    },
    tr: {
        'th:last-child': {
            pr: 0,
            input: {
                fontWeight: 400,
                fontSize: 16,
                lineHeight: '133%',
                color: '#000',
            },
        },
    },
    tbody: {
        tr: {
            '&:nth-of-type(odd)': {
                td: {
                    background: 'rgba(0, 0, 0, 0.06)',
                },
            },
        },
    },
}));

const variants = {
    colorful: colorfulVariant,
};

export const tableTheme = defineMultiStyleConfig({ variants });
