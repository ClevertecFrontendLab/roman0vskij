import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const blackVariant = defineStyle({
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: 6,
    padding: '0 24px',
    bg: 'rgba(0, 0, 0, 0.92)',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '156%',
    color: '#fff',
});

const variants = {
    black: blackVariant,
};

export const buttonTheme = defineStyleConfig({ variants });
