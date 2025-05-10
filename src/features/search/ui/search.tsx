import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { SearchIcon } from '~/shared/assets/icons';

type TProps = {
    onclick: (value: string) => void;
};

export function Search({ onclick }: TProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(inputValue.trim().length < 3);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.currentTarget.value);
        setButtonDisabled(e.currentTarget.value.trim().length < 3);
    }

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
                    pointerEvents={{ base: 'auto', md: isButtonDisabled ? 'none' : 'auto' }}
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

// type TProps = {
//     onclick: (value: string) => void;
// };
// export function Search({ onclick }: TProps) {
//     const dispatch = useAppDispatch();
//     const inputRef = useRef<HTMLInputElement>(null);
//     const searchQuery = useAppSelector(selectSearchQuery);
//     const [inputValue, setInputValue] = useState(searchQuery);
//     const [isButtonDisabled, setButtonDisabled] = useState(inputValue.trim().length < 3);

//     function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
//         setInputValue(e.currentTarget.value);
//         setButtonDisabled(e.currentTarget.value.trim().length < 3);
//         if (e.currentTarget.value.length === 0) dispatch(setSearchQuery(''));
//     }

//     return (
//         <InputGroup _hover={{ border: 'none', boxShadow: 'none' }}>
//             <Input
//                 onTouchStart={(e) => e.currentTarget.focus()}
//                 disabled={false}
//                 value={inputValue}
//                 ref={inputRef}
//                 onChange={handleOnChange}
//                 data-test-id='search-input'
//                 variant='colorful'
//                 placeholder='Название или ингредиент...'
//                 py={{ base: 7.5, lg: 3.25 }}
//                 pl={{ base: 3, lg: 4 }}
//                 pr={{ base: 8, lg: 12 }}
//                 h={{ base: 8, lg: 12 }}
//                 w='100%'
//             />
//             <InputRightElement h={{ base: 8, lg: 12 }} w={{ base: 8, lg: 12 }}>
//                 <IconButton
//                     onClick={() => onclick(inputRef.current!.value)}
//                     pointerEvents={{ base: 'auto', md: isButtonDisabled ? 'none' : 'auto' }}
//                     isDisabled={false}
//                     data-test-id='search-button'
//                     icon={<SearchIcon h={{ base: 3.5, lg: 18 }} w={{ base: 3.5, lg: 18 }} />}
//                     aria-label='search button'
//                     h={{ base: 8, lg: 12 }}
//                     w={{ base: 8, lg: 12 }}
//                     background='transparent'
//                     _hover={{ background: 'transparent' }}
//                     zIndex={2}
//                 />
//             </InputRightElement>
//         </InputGroup>
//     );
// }
