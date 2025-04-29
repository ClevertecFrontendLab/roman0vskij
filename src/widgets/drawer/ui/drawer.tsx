import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Drawer as DrawerWrapper,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuList,
    Stack,
    Switch,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Allergen } from '~/features/filter';
import { CirclePlusIcon } from '~/shared/assets/icons';
import { useCustomNavigate } from '~/shared/hooks/useCustomNavigate';
import { mockData } from '~/shared/mock/mockData';
import { TMock } from '~/shared/types';

import {
    setData,
    setSelectedAllergens,
    setSelectedAuthors,
    setSelectedCategories,
    setSelectedMeat,
    setSelectedSide,
} from '../model/drawerSlice';
import {
    selectSelectedAllergens,
    selectSelectedAuthors,
    selectSelectedCategories,
    selectSelectedMeat,
    selectSelectedSide,
} from '../model/selectors';
import { DrawerButton } from './drawerButton';

export function Drawer() {
    const navigate = useCustomNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const selectedCategories = useSelector(selectSelectedCategories);
    const dispatch = useDispatch();
    const [isActiveCategories, setIsActiveCategories] = useState(selectedCategories.length > 0);

    const categories = [
        'Первые блюда',
        'Вторые блюда',
        'Веганская кухня',
        'Закуски',
        'Детские блюда',
        'Десерты, выпечка',
        'Лечебное питание',
        'Соусы',
        'Напитки',
        'Заготовки',
    ];

    function handleOnchangeCategories(values: Array<string | number>) {
        if (values.length === 0) {
            setIsActiveCategories(false);
        } else {
            setIsActiveCategories(true);
        }
        dispatch(setSelectedCategories(values as string[]));
    }

    const selectedAuthors = useSelector(selectSelectedAuthors);
    const [isActiveAuthors, setIsActiveAuthors] = useState(selectedAuthors.length > 0);

    const authors = [
        'Елена Мин',
        'Мирием Чонишвили',
        'Елена Прекрасная',
        'Alex Cook',
        'Екатерина Константинопольская',
        'Инна Высоцкая',
        'Сергей Разумов',
        'Анна Рогачева',
        'Иван Орлов',
        'Повар Ши',
        'Только новые авторы',
    ];

    function handleOnchangeAuthors(values: Array<string | number>) {
        if (values.length === 0) {
            setIsActiveAuthors(false);
        } else {
            setIsActiveAuthors(true);
        }
        dispatch(setSelectedAuthors(values as string[]));
    }

    const selectedMeat = useSelector(selectSelectedMeat);

    const meat = ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'];

    function handleOnchangeMeat(values: Array<string | number>) {
        dispatch(setSelectedMeat(values as string[]));
    }

    const selectedSide = useSelector(selectSelectedSide);

    const side = [
        'Картошка',
        'Гречка',
        'Паста',
        'Спагетти',
        'Рис',
        'Капуста',
        'Фасоль',
        'Другие овощи',
    ];

    function handleOnchangeSide(values: Array<string | number>) {
        dispatch(setSelectedSide(values as string[]));
    }

    const selectedAllergens = useSelector(selectSelectedAllergens);
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

    function handleClear() {
        dispatch(setSelectedCategories([]));
        dispatch(setSelectedAuthors([]));
        dispatch(setSelectedAllergens([]));
        dispatch(setSelectedMeat([]));
        dispatch(setSelectedSide([]));
    }

    function useHandleFindRecipe() {
        onClose();
        const filtredData = filterBySide(filterByCategories(filterByAllergens(mockData)));
        dispatch(setData(filtredData));
        handleClear();
        navigate('/filters');
    }

    const [isDisabled, setDisabled] = useState(true);

    useEffect(() => {
        selectedAllergens.length > 0 ||
        selectedAuthors.length > 0 ||
        selectedCategories.length > 0 ||
        selectedMeat.length > 0 ||
        selectedSide.length > 0
            ? setDisabled(false)
            : setDisabled(true);
    }, [selectedAllergens, selectedAuthors, selectedCategories, selectedMeat, selectedSide]);

    function filterByAllergens(data: TMock[]) {
        return selectedAllergens.length > 0
            ? data.filter(
                  (recipe) =>
                      !recipe.ingredients.find((ingred) =>
                          selectedAllergens.find((a) =>
                              ingred.title.toLowerCase().includes(a.toLowerCase()),
                          ),
                      ),
              )
            : data;
    }

    function filterByCategories(data: TMock[]) {
        return selectedCategories.length > 0
            ? data.filter((recipe) =>
                  recipe.category.find((ingred) =>
                      selectedCategories.find(() =>
                          ingred.toLowerCase().includes('vegan'.toLowerCase()),
                      ),
                  ),
              )
            : data;
    }

    function filterBySide(data: TMock[]) {
        return selectedSide.length > 0
            ? data.filter((recipe) =>
                  selectedSide.find((s) => s.toLowerCase() == recipe.side?.toLowerCase()),
              )
            : data;
    }

    return (
        <>
            <DrawerButton onclick={onOpen} />
            <DrawerWrapper isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent data-test-id='filter-drawer' w='100%' maxW={463}>
                    <DrawerCloseButton
                        data-test-id='close-filter-drawer'
                        bg='#000'
                        borderRadius={9999}
                        sx={{ '& svg path': { fill: '#fff' } }}
                        w={6}
                        h={6}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        top={9}
                        right={8}
                    />
                    <DrawerHeader
                        mt={8}
                        mx={8}
                        p={0}
                        fontWeight={700}
                        fontSize={24}
                        lineHeight='133%'
                        color='#000'
                    >
                        Фильтр
                    </DrawerHeader>

                    <DrawerBody pt={0} px={8}>
                        <Stack spacing='24px' mt={10}>
                            <Menu key='menuu1' closeOnSelect={false}>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton
                                            data-test-id='filter-menu-button-категория'
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
                                            w={234}
                                            h='fit-content'
                                            textAlign='start'
                                            minH={10}
                                            borderColor={
                                                isOpen || isActiveCategories
                                                    ? '#c4ff61'
                                                    : 'rgba(0, 0, 0, 0.08)'
                                            }
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
                                            {selectedCategories.length > 0 ? (
                                                <Box
                                                    display='flex'
                                                    flexWrap='wrap'
                                                    gap={2}
                                                    my={2.5}
                                                >
                                                    {selectedCategories.map((a) => (
                                                        <Allergen key={a} text={a} />
                                                    ))}
                                                </Box>
                                            ) : (
                                                'Категория'
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
                                            <CheckboxGroup
                                                value={selectedCategories}
                                                onChange={handleOnchangeCategories}
                                            >
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
                                                    {categories.map((a, i) => (
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
                                    </>
                                )}
                            </Menu>
                            <Menu key='menuu2' closeOnSelect={false}>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton
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
                                            textAlign='start'
                                            minH={10}
                                            borderColor={
                                                isOpen || isActiveAuthors
                                                    ? '#c4ff61'
                                                    : 'rgba(0, 0, 0, 0.08)'
                                            }
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
                                            {selectedAuthors.length > 0 ? (
                                                <Box
                                                    display='flex'
                                                    flexWrap='wrap'
                                                    gap={2}
                                                    my={2.5}
                                                >
                                                    {selectedAuthors.map((a) => (
                                                        <Allergen key={a} text={a} />
                                                    ))}
                                                </Box>
                                            ) : (
                                                'Поиск по автору'
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
                                            <CheckboxGroup
                                                value={selectedAuthors}
                                                onChange={handleOnchangeAuthors}
                                            >
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
                                                    {authors.map((a, i) => (
                                                        <Checkbox
                                                            data-test-id={
                                                                isOpen ? `allergen-${i}` : ''
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
                                    </>
                                )}
                            </Menu>
                            <CheckboxGroup value={selectedMeat} onChange={handleOnchangeMeat}>
                                <Heading
                                    fontWeight={500}
                                    fontSize={16}
                                    lineHeight='150%'
                                    color='#000'
                                >
                                    Тип мяса:
                                </Heading>
                                <Stack spacing={0}>
                                    {meat.map((a, i) => (
                                        <Checkbox
                                            //data-test-id={`allergen-${i}`}
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
                            <CheckboxGroup value={selectedSide} onChange={handleOnchangeSide}>
                                <Heading
                                    fontWeight={500}
                                    fontSize={16}
                                    lineHeight='150%'
                                    color='#000'
                                >
                                    Тип гарнира:
                                </Heading>
                                <Stack spacing={0}>
                                    {side.map((a, i) => (
                                        <Checkbox
                                            data-test-id={
                                                a === 'Картошка' ? 'checkbox-картошка' : ''
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

                            <Stack
                                flexDirection='column'
                                align='flex-start'
                                justify='center'
                                gap={4}
                            >
                                <FormControl
                                    display='flex'
                                    alignItems='center'
                                    py={1.5}
                                    w='fit-content'
                                >
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
                                        data-test-id='allergens-switcher-filter'
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
                                                data-test-id='allergens-menu-button-filter'
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
                                                borderColor={
                                                    isOpen || isActive
                                                        ? '#c4ff61'
                                                        : 'rgba(0, 0, 0, 0.08)'
                                                }
                                                _hover={{
                                                    borderColor: '#c4ff61',
                                                    color: '#2d3748',
                                                }}
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
                                                    <Box
                                                        display='flex'
                                                        flexWrap='wrap'
                                                        gap={2}
                                                        my={2.5}
                                                    >
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
                                                <CheckboxGroup
                                                    value={selectedAllergens}
                                                    onChange={handleOnchange}
                                                >
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
                                                                data-test-id={
                                                                    isOpen ? `allergen-${i}` : ''
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
                                                                data-test-id={
                                                                    isOpen
                                                                        ? 'add-other-allergen'
                                                                        : ''
                                                                }
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
                                                                data-test-id={
                                                                    isOpen
                                                                        ? 'add-allergen-button'
                                                                        : ''
                                                                }
                                                                onClick={addAllergen}
                                                                icon={
                                                                    <CirclePlusIcon fill='#2DB100' />
                                                                }
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
                            </Stack>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter display='flex' flexDirection='column'>
                        <Stack
                            direction='row'
                            wrap='wrap'
                            gap={4}
                            justifyContent='flex-start'
                            w='100%'
                        >
                            {[
                                ...selectedCategories,
                                ...selectedAllergens,
                                ...selectedAuthors,
                                ...selectedMeat,
                                ...selectedSide,
                            ].map((e, i) => (
                                <Box data-test-id='filter-tag'>
                                    <Allergen key={`filter-tag-${i}`} text={e} />
                                </Box>
                            ))}
                        </Stack>
                        <HStack mt={8} justifyContent='flex-end' w='100%' gap={2}>
                            <Button
                                data-test-id='clear-filter-button'
                                variant='none'
                                bg='#fff'
                                color='rgba(0, 0, 0, 0.8)'
                                border='1px solid rgba(0, 0, 0, 0.48)'
                                borderRadius={6}
                                fontWeight={600}
                                fontSize={18}
                                lineHeight='156%'
                                px={6}
                                h={12}
                                onClick={handleClear}
                            >
                                Очистить фильтр
                            </Button>
                            <Button
                                pointerEvents={isDisabled ? 'none' : 'auto'}
                                data-test-id='find-recipe-button'
                                variant='none'
                                bg='#000'
                                color='#fff'
                                border='1px solid rgba(0, 0, 0, 0.08)'
                                borderRadius={6}
                                fontWeight={600}
                                fontSize={18}
                                lineHeight='156%'
                                px={6}
                                h={12}
                                onClick={useHandleFindRecipe}
                            >
                                Найти рецепт
                            </Button>
                        </HStack>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerWrapper>
        </>
    );
}
