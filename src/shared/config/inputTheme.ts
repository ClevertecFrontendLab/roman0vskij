import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const colorfulVariant = definePartsStyle({
    field: {
        color: '#134b00',
        border: '1px solid rgba(0, 0, 0, 0.48)',
        borderRadius: { base: 4, lg: 6 },
        fontSize: { base: 14, lg: 18 },
        fontWeight: 400,
        _placeholder: { color: '#134b00' },
        _focus: { '::placeholder': { opacity: 0 } },
    },
});

const defaultVariant = definePartsStyle({
    field: {
        color: '#134b00',
        border: '1px solid #d7ff94',
        borderRadius: 6,
        fontSize: 18,
        fontWeight: 400,
        p: '0 16px',
        bg: '#fff',
        _placeholder: { color: '#134b00' },
        _focus: { '::placeholder': { opacity: 0 } },
    },
});

const variants = {
    colorful: colorfulVariant,
    default: defaultVariant,
};

export const inputTheme = defineMultiStyleConfig({ variants });
