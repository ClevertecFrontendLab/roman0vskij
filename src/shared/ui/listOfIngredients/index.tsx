import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useLayoutEffect, useState } from 'react';

import { TIngredient } from '~/entities/recipe';

type TProps = { ingredients: TIngredient[]; portions: number };

export function ListOfIngredients({ ingredients, portions }: TProps) {
    const [portion, setPortion] = useState(1);

    function handleOnclick(value: string) {
        setPortion(+value);
    }

    useLayoutEffect(() => {
        setPortion(portions);
    }, []);

    return (
        <TableContainer w='100%'>
            <Table variant='colorful' w='100%'>
                <Thead w='100%'>
                    <Tr w='100%'>
                        <Th w='50%'>ИНГРЕДИЕНТЫ</Th>
                        <Th
                            display='flex'
                            w='100%'
                            alignItems='center'
                            justifyContent='flex-end'
                            gap={{ base: 3, md: 4 }}
                        >
                            ПОРЦИЙ
                            <NumberInput
                                defaultValue={portions}
                                min={1}
                                maxW='90px'
                                onChange={handleOnclick}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper data-test-id='increment-stepper' />
                                    <NumberDecrementStepper data-test-id='decrement-stepper' />
                                </NumberInputStepper>
                            </NumberInput>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map(({ title, count, measureUnit }, i) => (
                        <Tr data-test-id={`ingredient-quantity-${i}`} key={`ingredient${i}`}>
                            <Td key={`ingredient-name-${i}`}>{title}</Td>
                            <Td key={`ingredient-quantity-${i}`} isNumeric>
                                {+count
                                    ? `${(+count / portions) * portion} ${measureUnit}`
                                    : measureUnit}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
