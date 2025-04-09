import { Heading } from '@chakra-ui/react';

type TProps = {
    title: string;
    isForBlog?: boolean;
};

export default function Title({ title, isForBlog = false }: TProps) {
    return (
        <Heading
            fontWeight={isForBlog ? { base: 500, xl: 400 } : 500}
            fontSize={isForBlog ? { base: 24, lg: 30, xl: 36 } : { base: 24, lg: 36, xl: 48 }}
            lineHeight={
                isForBlog
                    ? { base: '133%', lg: '120%', xl: '111%' }
                    : { base: '133%', lg: '111%', xl: '100%' }
            }
            color='#000'
            w='fit-content'
        >
            {title}
        </Heading>
    );
}
