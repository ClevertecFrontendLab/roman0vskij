import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { SearchIcon } from '~/shared/assets/icons';
import { useAppSelector } from '~/store/hooks';
import { selectSelectedAllergens } from '~/widgets/drawer';

type TProps = {
    onclick: (value: string) => void;
};

export function Search({ onclick }: TProps) {
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [isButtonActive, setButtonActive] = useState(
        inputValue.trim().length > 2 || selectedAllergens?.length > 0,
    );

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.currentTarget.value);
        setButtonActive(e.currentTarget.value.trim().length > 2 || selectedAllergens?.length > 0);
    }

    useEffect(() => {
        setButtonActive(selectedAllergens?.length > 0);
    }, [selectedAllergens]);

    return (
        <InputGroup _hover={{ border: 'none', boxShadow: 'none' }}>
            <Input
                onTouchStart={(e) => e.currentTarget.focus()}
                disabled={false}
                value={inputValue}
                ref={inputRef}
                onChange={handleOnChange}
                data-test-id='search-input'
                variant='colorful'
                placeholder='Название или ингредиент...'
                py={{ base: 7.5, lg: 3.25 }}
                pl={{ base: 3, lg: 4 }}
                pr={{ base: 8, lg: 12 }}
                h={{ base: 8, lg: 12 }}
                w='100%'
            />
            <InputRightElement h={{ base: 8, lg: 12 }} w={{ base: 8, lg: 12 }}>
                <IconButton
                    onClick={() => onclick(inputRef.current!.value)}
                    pointerEvents={{ base: 'auto', md: isButtonActive ? 'auto' : 'none' }}
                    isDisabled={false}
                    data-test-id='search-button'
                    icon={<SearchIcon h={{ base: 3.5, lg: 18 }} w={{ base: 3.5, lg: 18 }} />}
                    aria-label='search button'
                    h={{ base: 8, lg: 12 }}
                    w={{ base: 8, lg: 12 }}
                    background='transparent'
                    _hover={{ background: 'transparent' }}
                    zIndex={2}
                />
            </InputRightElement>
        </InputGroup>
    );
}
