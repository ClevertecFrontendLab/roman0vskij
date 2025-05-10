import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Menu,
    MenuButton,
    MenuList,
    Stack,
} from '@chakra-ui/react';

import { Allergen } from '~/features/filter';

type TProps = {
    isActive: boolean;
    values: string[];
    selectedValues: string[];
    handleOnchange: (values: Array<string | number>) => void;
    placeholder: string;
};

export function DrawerSelect({
    isActive,
    handleOnchange,
    selectedValues,
    values,
    placeholder,
}: TProps) {
    return (
        <Menu key='menuu1' closeOnSelect={false}>
            {({ isOpen }) => (
                <>
                    <MenuButton
                        data-test-id={
                            placeholder === 'Категория' ? 'filter-menu-button-категория' : ''
                        }
                        _disabled={{
                            opacity: 1,
                            cursor: 'not-allowed',
                            _hover: {
                                borderColor: 'rgba(0, 0, 0, 0.08)',
                                color: 'rgba(0, 0, 0, 0.64)',
                            },
                        }}
                        as={Button}
                        borderRadius={6}
                        fontWeight={400}
                        fontSize={16}
                        lineHeight='150%'
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        color='rgba(0, 0, 0, 0.64)'
                        bg='transparent'
                        w='100%'
                        h='fit-content'
                        textAlign='start'
                        minH={10}
                        borderColor={isOpen || isActive ? '#c4ff61' : 'rgba(0, 0, 0, 0.08)'}
                        _hover={{ borderColor: '#c4ff61', color: '#2d3748' }}
                        _active={{ background: 'transparent' }}
                        rightIcon={
                            isOpen ? <ChevronUpIcon w={5} h={5} /> : <ChevronDownIcon w={5} h={5} />
                        }
                    >
                        {selectedValues.length > 0 ? (
                            <Box display='flex' flexWrap='wrap' gap={2} my={2.5}>
                                {selectedValues.map((a) => (
                                    <Allergen key={a} text={a} />
                                ))}
                            </Box>
                        ) : (
                            placeholder
                        )}
                    </MenuButton>
                    <Box
                        position='absolute'
                        w='calc(100% - 72px)'
                        h='fit-content'
                        px={8}
                        sx={{
                            '& > *': {
                                w: '100%',
                                minW: 'fit-content !IMPORTANT',
                            },
                        }}
                    >
                        <MenuList
                            position='relative'
                            data-test-id='allergens-menu'
                            w='100%'
                            borderRadius={4}
                            boxShadow='0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                            p='4px 0'
                            zIndex={10}
                        >
                            <CheckboxGroup value={selectedValues} onChange={handleOnchange}>
                                <Stack
                                    sx={{
                                        '& > *:nth-of-type(odd)': {
                                            background: 'rgba(0, 0, 0, 0.06)',
                                        },
                                        '& > *:last-child': {
                                            background: '#fff',
                                        },
                                    }}
                                    spacing={0}
                                >
                                    {values.map((a, i) => (
                                        <Checkbox
                                            data-test-id={
                                                a === 'Веганская кухня'
                                                    ? 'checkbox-веганская кухня'
                                                    : 'checkbox'
                                            }
                                            key={`option${i}`}
                                            value={a}
                                            p='6px 16px'
                                            icon={<CheckIcon />}
                                            sx={{
                                                alignItems: 'center',
                                                '& .chakra-checkbox__control': {
                                                    border: '2px solid #d7ff94',
                                                    bg: 'transparent',
                                                },
                                            }}
                                        >
                                            {a}
                                        </Checkbox>
                                    ))}
                                </Stack>
                            </CheckboxGroup>
                        </MenuList>
                    </Box>
                </>
            )}
        </Menu>
    );
}
