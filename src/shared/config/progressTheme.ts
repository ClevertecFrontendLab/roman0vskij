import { progressAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    progressAnatomy.keys,
);

const colorfulVariant = definePartsStyle({
    track: {
        bg: 'rgba(0, 0, 0, 0.06)',
    },
    filledTrack: {
        bgColor: '#c4ff61',
        bgImage:
            'linear-gradient(45deg, rgba(255, 255, 255, 0.3) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.3) 75%, transparent 75%, transparent)',
    },
});

const variants = {
    colorful: colorfulVariant,
};

export const progressTheme = defineMultiStyleConfig({ variants });
