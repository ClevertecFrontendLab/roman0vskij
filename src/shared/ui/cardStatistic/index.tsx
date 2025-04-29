import { HStack, Text } from '@chakra-ui/react';

import { BookmarkIcon, LikeIcon } from '~/shared/assets/icons';

type TProps = {
    bookmarks: number;
    likes: number;
};

export function CardStatistic({ bookmarks, likes }: TProps) {
    return (
        <HStack h={6} gap={2}>
            {bookmarks > 0 && (
                <HStack gap={1.5} p={1}>
                    <BookmarkIcon />
                    <Text fontSize={12} fontWeight={600} lineHeight='133%' color='#2db100'>
                        {bookmarks}
                    </Text>
                </HStack>
            )}
            {likes > 0 && (
                <HStack gap={1.5} p={1}>
                    <LikeIcon />
                    <Text fontSize={12} fontWeight={600} lineHeight='133%' color='#2db100'>
                        {likes}
                    </Text>
                </HStack>
            )}
        </HStack>
    );
}
