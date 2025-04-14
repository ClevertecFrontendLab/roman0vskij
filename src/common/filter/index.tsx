import { FormControl, FormLabel, HStack, Select, Switch } from '@chakra-ui/react';

export default function Filter() {
    return (
        <HStack justify='center'>
            <FormControl display='flex' alignItems='center' py={1.5} w='fit-content'>
                <FormLabel
                    htmlFor='allergens'
                    mb='0'
                    ml={2}
                    fontWeight={500}
                    fontSize={16}
                    lineHeight='150%'
                    color='#000'
                >
                    Исключить мои аллергены
                </FormLabel>
                <Switch id='allergens' />
            </FormControl>
            <Select
                variant='none'
                placeholder='Выберите из списка...'
                w={234}
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius={6}
                fontWeight={400}
                fontSize={16}
                lineHeight='150%'
                color='rgba(0, 0, 0, 0.64)'
                _hover={{ borderColor: '#c4ff61', color: '#2d3748' }}
            />
        </HStack>
    );
}
