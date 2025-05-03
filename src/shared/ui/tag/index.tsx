import { Box, HStack, Image, Text } from '@chakra-ui/react';

import { mockCategories } from '~/shared/mock/mockCategories';

type TBaseProps = {
    isRelevant?: boolean;
    bgClr: string;
    category: string[];
};

type TCustomProps = {
    type: 'custom';
    isRelevant?: boolean;
    bgClr: string;
    name: string;
    img: string;
};

type TProps = (TBaseProps & { type?: 'base' }) | TCustomProps;

export function Tag(props: TProps) {
    function isBaseProps(props: TProps): props is TBaseProps {
        return !props.type || props.type === 'base';
    }

    const category = isBaseProps(props)
        ? mockCategories.find((e) => e.id === props.category[0])
        : props;

    return (
        <Box
            bgColor={props.bgClr}
            w='fit-content'
            px={props.isRelevant ? 2 : { base: 1, lg: 2 }}
            py={0.5}
            borderRadius={4}
            h={6}
        >
            <HStack spacing={props.isRelevant ? 2 : { base: 0.5, lg: 2 }}>
                <Image h={4} w={4} src={category?.img} />
                <Text
                    fontSize={14}
                    fontWeight={400}
                    lineHeight='143%'
                    color='#000'
                    wordBreak='break-all'
                    noOfLines={1}
                >
                    {category?.name}
                </Text>
            </HStack>
        </Box>
    );
    // const categories = isBaseProps(props)
    //     ? props.category.map((category) => mockCategories.find((e) => e.id === category))
    //     : [props];

    // return (
    //     <VStack align='flex-start'>
    //         {categories.map((category) => (
    //             <Box
    //                 bgColor={props.bgClr}
    //                 w='fit-content'
    //                 px={props.isRelevant ? 2 : { base: 1, lg: 2 }}
    //                 py={0.5}
    //                 borderRadius={4}
    //                 h={6}
    //             >
    //                 <HStack spacing={props.isRelevant ? 2 : { base: 0.5, lg: 2 }}>
    //                     <Image h={4} w={4} src={category?.img} />
    //                     <Text
    //                         fontSize={14}
    //                         fontWeight={400}
    //                         lineHeight='143%'
    //                         color='#000'
    //                         wordBreak='break-all'
    //                         noOfLines={1}
    //                     >
    //                         {category?.name}
    //                     </Text>
    //                 </HStack>
    //             </Box>
    //         ))}
    //     </VStack>
    // );
}
