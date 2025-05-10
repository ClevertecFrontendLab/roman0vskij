import { CheckIcon } from '@chakra-ui/icons';
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
    Heading,
    HStack,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { selectCategories } from '~/entities/category';
import { setRecipes } from '~/entities/recipe';
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
import { setAppError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import {
    selectSelectedAllergens,
    selectSelectedAuthors,
    selectSelectedCategories,
    selectSelectedMeat,
    selectSelectedSide,
} from '../model/selectors';
import {
    setSelectedAllergens,
    setSelectedAuthors,
    setSelectedCategories,
    setSelectedMeat,
    setSelectedSide,
} from '../model/slice';
import { DrawerAllergens } from './drawerAllergens';
import { DrawerButton } from './drawerButton';
import { DrawerSelect } from './drawerSelect';
import { DrawerTag } from './drawerTag';

export function Drawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const selectedCategories = useAppSelector(selectSelectedCategories);
    const dispatch = useAppDispatch();
    const [isActiveCategories, setIsActiveCategories] = useState(selectedCategories.length > 0);

    const categories = useAppSelector(selectCategories);

    function handleOnchangeCategories(values: Array<string | number>) {
        if (values.length === 0) {
            setIsActiveCategories(false);
        } else {
            setIsActiveCategories(true);
        }
        dispatch(setSelectedCategories(values as string[]));
    }

    const selectedAuthors = useAppSelector(selectSelectedAuthors);
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

    const selectedMeat = useAppSelector(selectSelectedMeat);

    const meat = ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'];

    function handleOnchangeMeat(values: Array<string | number>) {
        dispatch(setSelectedMeat(values as string[]));
    }

    const selectedSide = useAppSelector(selectSelectedSide);

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

    const selectedAllergens = useAppSelector(selectSelectedAllergens);
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

    const [
        getRecipesQuery,
        {
            data: dataRecipes,
            error: errorRecipes,
            isSuccess: isSuccessRecipes,
            isError: isErrorRecipes,
            isFetching: isFetchingRecipes,
        },
    ] = useLazyGetRecipesQuery();

    useEffect(() => {
        dispatch(setAppLoader(isFetchingRecipes));

        if (!isFetchingRecipes && isSuccessRecipes && dataRecipes) {
            dispatch(setRecipes(dataRecipes.data));
            handleClear();
            return;
        }
        if (isErrorRecipes && errorRecipes) {
            dispatch(setAppError(`Search error: ${errorRecipes.toString()}`));
        } else {
            dispatch(setAppError(null));
        }
    }, [dataRecipes, isSuccessRecipes, isErrorRecipes, errorRecipes, isFetchingRecipes]);

    function useHandleFindRecipe() {
        // console.log({
        //     allergens: selectedAllergens.length ? selectedAllergens.join(',') : undefined,
        //     garnish: selectedSide.length ? selectedSide.join(',') : undefined,
        //     meat: selectedMeat.length ? selectedMeat.join(',') : undefined,
        //     subcategoriesIds: selectedCategories.length
        //         ? categories
        //               .filter((c) => selectedCategories.find((s) => s === c.title))
        //               .map((c) => c.subCategories.map((sub) => sub._id).join(','))
        //               .join(',')
        //         : undefined,
        // });

        getRecipesQuery({
            subcategoriesIds: selectedCategories.length
                ? categories
                      .filter((c) => selectedCategories.find((s) => s === c.title))
                      .map((c) => c._id)
                      .join(',')
                : undefined,
            allergens: selectedAllergens.length ? selectedAllergens.join(',') : undefined,
            garnish: selectedSide.length ? selectedSide.join(',') : undefined,
            meat: selectedMeat.length ? selectedMeat.join(',') : undefined,
        });
        onClose();
    }

    enum GROUP {
        CATEGORIES = 'categories',
        AUTHORS = 'authors',
        MEAT = 'meat',
        SIDE = 'side',
        ALLERGENS = 'allergens',
    }

    type FilterTag = {
        label: string;
        group: GROUP;
    };

    const allSelectedFilters: FilterTag[] = [
        ...selectedCategories.map((label) => ({ label, group: GROUP.CATEGORIES })),
        ...selectedAuthors.map((label) => ({ label, group: GROUP.AUTHORS })),
        ...selectedMeat.map((label) => ({ label, group: GROUP.MEAT })),
        ...selectedSide.map((label) => ({ label, group: GROUP.SIDE })),
        ...selectedAllergens.map((label) => ({ label, group: GROUP.ALLERGENS })),
    ];

    function deleteTag(tag: FilterTag) {
        switch (tag.group) {
            case GROUP.CATEGORIES:
                dispatch(
                    setSelectedCategories(selectedCategories.filter((item) => item !== tag.label)),
                );
                break;
            case GROUP.AUTHORS:
                dispatch(setSelectedAuthors(selectedAuthors.filter((item) => item !== tag.label)));
                break;
            case GROUP.MEAT:
                dispatch(setSelectedMeat(selectedMeat.filter((item) => item !== tag.label)));
                break;
            case GROUP.SIDE:
                dispatch(setSelectedSide(selectedSide.filter((item) => item !== tag.label)));
                break;
            case GROUP.ALLERGENS:
                dispatch(
                    setSelectedAllergens(selectedAllergens.filter((item) => item !== tag.label)),
                );
                break;
            default:
                break;
        }
    }

    return (
        <>
            <DrawerButton onclick={onOpen} />
            <DrawerWrapper isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent data-test-id='filter-drawer' w='100%' maxW={{ base: 344, lg: 463 }}>
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
                            <DrawerSelect
                                key='categoriesMenu'
                                handleOnchange={handleOnchangeCategories}
                                isActive={isActiveCategories}
                                selectedValues={selectedCategories}
                                values={categories.map((c) => c.title)}
                                placeholder='Категория'
                            />
                            <DrawerSelect
                                key='authorsMenu'
                                handleOnchange={handleOnchangeAuthors}
                                isActive={isActiveAuthors}
                                selectedValues={selectedAuthors}
                                values={authors}
                                placeholder='Поиск по автору'
                            />

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

                            <DrawerAllergens
                                isActive={isActive}
                                addAllergen={addAllergen}
                                handleKeyDown={handleKeyDown}
                                handleOnchange={handleOnchange}
                                inputRef={inputRef}
                                selectedValues={selectedAllergens}
                                values={allergens}
                                toggleIsActive={toggleIsActive}
                            />
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter display='flex' flexDirection='column' zIndex={50} bg='#fff'>
                        <Stack
                            direction='row'
                            wrap='wrap'
                            gap={4}
                            justifyContent='flex-start'
                            w='100%'
                        >
                            {allSelectedFilters.map((tag, i) => (
                                <Box
                                    data-test-id='filter-tag'
                                    onClick={() => deleteTag(tag)}
                                    cursor='pointer'
                                >
                                    <DrawerTag key={`filter-tag-${i}`} text={tag.label} />
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
                                fontSize={{ base: 14, lg: 18 }}
                                lineHeight={{ base: '143%', lg: '156%' }}
                                px={{ base: 3, lg: 6 }}
                                h={{ base: 8, lg: 12 }}
                                onClick={handleClear}
                            >
                                Очистить фильтр
                            </Button>
                            <Button
                                pointerEvents={allSelectedFilters.length == 0 ? 'none' : 'auto'}
                                data-test-id='find-recipe-button'
                                variant='none'
                                bg='#000'
                                color='#fff'
                                border='1px solid rgba(0, 0, 0, 0.08)'
                                borderRadius={6}
                                fontWeight={600}
                                fontSize={{ base: 14, lg: 18 }}
                                lineHeight={{ base: '143%', lg: '156%' }}
                                px={{ base: 3, lg: 6 }}
                                h={{ base: 8, lg: 12 }}
                                onClick={useHandleFindRecipe}
                                isDisabled={allSelectedFilters.length == 0}
                                _disabled={{
                                    color: 'rgba(255, 255, 255, 0.64)',
                                    bg: 'rgba(0, 0, 0, 0.24)',
                                }}
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
