import { VStack } from '@chakra-ui/react';
import { useState } from 'react';

type TProps = {
    children: React.ReactNode;
};

export function SearchAndFilter({ children }: TProps) {
    const [isActive, setIsActive] = useState(false);

    function handleObFocus() {
        setIsActive(true);
    }

    function handleObBlur(e: React.FocusEvent<HTMLDivElement, Element>) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsActive(false);
        }
    }

    return (
        <VStack
            w='100%'
            maxW={{ base: 578, xl: 898 }}
            justifySelf='center'
            align='center'
            onFocusCapture={handleObFocus}
            onBlurCapture={handleObBlur}
            boxShadow={
                isActive
                    ? '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    : 'none'
            }
            borderRadius={24}
            mb={{ base: 4, lg: 6 }}
            pb={{ base: 4, lg: 8 }}
        >
            {children}
        </VStack>
    );
}
