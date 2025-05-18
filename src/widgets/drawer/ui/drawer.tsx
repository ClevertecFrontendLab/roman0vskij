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
import { useRef } from 'react';

import { selectCategories } from '~/entities/category';
import { useAppSelector } from '~/store/hooks';

import { DrawerLogic } from '../model/logic';
import { allergensMock, authorsMock, meatMock, sideMock } from '../model/mock';
import { DrawerAllergens } from './drawerAllergens';
import { DrawerButton } from './drawerButton';
import { DrawerSelect } from './drawerSelect';
import { DrawerTag } from './drawerTag';

export function Drawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const allCategories = useAppSelector(selectCategories);
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        deleteTag,
        handleClear,
        toggleIsActive,
        handleFindRecipe,
        allSelectedFilters,
        allergens,
        categories,
        authors,
        side,
        meat,
    } = DrawerLogic({
        inputRef,
        onClose,
    });

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
                                {...categories}
                                values={allCategories.map((c) => c.title)}
                                placeholder='Категория'
                            />
                            <DrawerSelect
                                key='authorsMenu'
                                {...authors}
                                values={authorsMock}
                                placeholder='Поиск по автору'
                            />

                            <CheckboxGroup
                                value={meat.selectedValues}
                                onChange={meat.handleOnchange}
                            >
                                <Heading
                                    fontWeight={500}
                                    fontSize={16}
                                    lineHeight='150%'
                                    color='#000'
                                >
                                    Тип мяса:
                                </Heading>
                                <Stack spacing={0}>
                                    {meatMock.map((a, i) => (
                                        <Checkbox
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
                            <CheckboxGroup
                                value={side.selectedValues}
                                onChange={side.handleOnchange}
                            >
                                <Heading
                                    fontWeight={500}
                                    fontSize={16}
                                    lineHeight='150%'
                                    color='#000'
                                >
                                    Тип гарнира:
                                </Heading>
                                <Stack spacing={0}>
                                    {sideMock.map((a, i) => (
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
                                {...allergens}
                                inputRef={inputRef}
                                values={allergensMock}
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
                                    key={`filter-tag-${i}`}
                                    data-test-id='filter-tag'
                                    onClick={() => deleteTag(tag)}
                                    cursor='pointer'
                                >
                                    <DrawerTag text={tag.label} />
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
                                onClick={handleFindRecipe}
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
