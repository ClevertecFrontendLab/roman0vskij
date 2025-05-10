import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuList,
    Stack,
    Switch,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { CheckIcon, CirclePlusIcon } from '~/shared/assets/icons';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { selectSelectedAllergens } from '../model/selectors';
import { setSelectedAllergens } from '../model/slice';
import { Allergen } from './allergen';

export function Filter() {
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(selectedAllergens.length > 0);
    const inputRef = useRef<HTMLInputElement>(null);

    const allergens = [
        'Молочные',
        'Яйцо',
        'Рыба',
        'Моллюски',
        'Орехи',
        'Томат',
        'Цитрусовые',
        'Клубника (ягоды)',
        'Шоколад',
    ];

    function handleOnchange(values: Array<string | number>) {
        if (values.length === 0) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
        dispatch(setSelectedAllergens(values as string[]));
    }

    function toggleIsActive() {
        setIsActive((prev) => !prev);
        dispatch(setSelectedAllergens([]));
    }

    function addAllergen() {
        if (inputRef.current && inputRef.current.value.length > 0) {
            dispatch(
                setSelectedAllergens([...selectedAllergens, inputRef.current?.value as string]),
            );
            inputRef.current.value = '';
            setIsActive(true);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addAllergen();
        }
    };

    return (
        <HStack align='flex-start' justify='center' gap={4}>
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
                <Switch
                    data-test-id='allergens-switcher'
                    isChecked={isActive}
                    onChange={toggleIsActive}
                    id='allergens'
                />
            </FormControl>
            <Menu closeOnSelect={false}>
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            isDisabled={!isActive}
                            _disabled={{
                                opacity: 1,
                                cursor: 'not-allowed',
                                _hover: {
                                    borderColor: 'rgba(0, 0, 0, 0.08)',
                                    color: 'rgba(0, 0, 0, 0.64)',
                                },
                            }}
                            data-test-id='allergens-menu-button'
                            as={Button}
                            borderRadius={6}
                            fontWeight={400}
                            fontSize={16}
                            lineHeight='150%'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            color='rgba(0, 0, 0, 0.64)'
                            bg='transparent'
                            w={234}
                            h='fit-content'
                            minH={10}
                            borderColor={isOpen || isActive ? '#c4ff61' : 'rgba(0, 0, 0, 0.08)'}
                            _hover={{ borderColor: '#c4ff61', color: '#2d3748' }}
                            _active={{ background: 'transparent' }}
                            rightIcon={
                                isOpen ? (
                                    <ChevronUpIcon w={5} h={5} />
                                ) : (
                                    <ChevronDownIcon w={5} h={5} />
                                )
                            }
                        >
                            {selectedAllergens.length > 0 ? (
                                <Box display='flex' flexWrap='wrap' gap={2} my={2.5}>
                                    {selectedAllergens.map((a) => (
                                        <Allergen key={a} text={a} />
                                    ))}
                                </Box>
                            ) : (
                                'Выберите из списка...'
                            )}
                        </MenuButton>
                        <MenuList
                            data-test-id='allergens-menu'
                            w={234}
                            borderRadius={4}
                            boxShadow='0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                            p='4px 0'
                            zIndex={10}
                        >
                            <CheckboxGroup value={selectedAllergens} onChange={handleOnchange}>
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
                                    {allergens.map((a, i) => (
                                        <Checkbox
                                            data-test-id={`allergen-${i}`}
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

                                    <HStack
                                        boxShadow='none'
                                        w='100%'
                                        bg='#fff'
                                        py={2}
                                        pl={6}
                                        pr={2}
                                        gap={2}
                                    >
                                        <Input
                                            data-test-id={isOpen ? 'add-other-allergen' : ''}
                                            ref={inputRef}
                                            onKeyDown={handleKeyDown}
                                            h={8}
                                            px={3}
                                            py={1.5}
                                            placeholder='Другой аллерген'
                                            _placeholder={{ color: '#134b00' }}
                                            _focusVisible={{
                                                outline: 'none',
                                                _placeholder: { opacity: 0 },
                                            }}
                                            _hover={{ boxShadow: 'none' }}
                                            border='1px solid rgba(0, 0, 0, 0.08)'
                                            borderRadius={4}
                                            fontWeight={400}
                                            fontSize={14}
                                            lineHeight='143%'
                                            color='#134b00'
                                        />
                                        <IconButton
                                            data-test-id={isOpen ? 'add-allergen-button' : ''}
                                            onClick={addAllergen}
                                            icon={<CirclePlusIcon fill='#2DB100' />}
                                            aria-label='add allergen'
                                            h={6}
                                            w={6}
                                            minW={6}
                                            bg='transparent'
                                            _hover={{ bg: 'transparent' }}
                                        />
                                    </HStack>
                                </Stack>
                            </CheckboxGroup>
                        </MenuList>
                    </>
                )}
            </Menu>
        </HStack>
    );
}
