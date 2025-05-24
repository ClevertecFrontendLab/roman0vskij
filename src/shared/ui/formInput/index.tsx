import { Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import {
    FieldErrors,
    FieldPath,
    FieldValues,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';

import { HiddenIcon, ShownIcon } from '~/shared/assets/icons';

type TProps = {
    name: FieldPath<FieldValues>;
    register: UseFormRegister<FieldValues>;
    rules?: RegisterOptions;
    errors: FieldErrors<FieldValues>;
    handleTrimOnBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    placeholder: string;
    label: string;
    helperText?: string;
    type?: 'default' | 'password';
    'data-test-id'?: string;
};

export function FormInput({
    name,
    register,
    rules,
    errors,
    handleTrimOnBlur = () => {},
    placeholder,
    label,
    helperText,
    type = 'default',
    'data-test-id': dataTestId,
}: TProps) {
    const [show, setShow] = useState(false);

    const handleMouseDown = () => setShow(true);
    const handleMouseUp = () => setShow(false);

    return type === 'password' ? (
        <VStack gap={1} w='100%' key={name}>
            <Text
                as='label'
                htmlFor={name}
                w='100%'
                textAlign='left'
                fontWeight={400}
                fontSize={16}
                lineHeight='150%'
                color='#000'
            >
                {label}
            </Text>
            <InputGroup size='md'>
                <Input
                    data-test-id={dataTestId}
                    id={name}
                    {...register(name, rules)}
                    h={12}
                    variant='default'
                    placeholder={placeholder}
                    borderColor={errors[name] ? 'red.500' : '#d7ff94'}
                    borderWidth={errors[name] ? '2px' : '1px'}
                    type={show ? 'text' : 'password'}
                />
                <InputRightElement
                    data-test-id='password-visibility-button'
                    h={12}
                    w={12}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                    bg='none'
                >
                    {show ? <ShownIcon /> : <HiddenIcon />}
                </InputRightElement>
            </InputGroup>
            {helperText && (
                <Text
                    fontWeight={400}
                    fontSize={12}
                    lineHeight='133%'
                    color='rgba(0, 0, 0, 0.64)'
                    w='100%'
                    mt={1}
                >
                    {helperText}
                </Text>
            )}
            {errors[name] && (
                <Text
                    fontWeight={400}
                    fontSize={12}
                    lineHeight='133%'
                    color='red.500'
                    w='100%'
                    mt={1}
                >
                    {errors[name].message?.toString()}
                </Text>
            )}
        </VStack>
    ) : (
        <VStack gap={1} w='100%' key={name}>
            <Text
                as='label'
                htmlFor={name}
                w='100%'
                textAlign='left'
                fontWeight={400}
                fontSize={16}
                lineHeight='150%'
                color='#000'
            >
                {label}
            </Text>
            <Input
                data-test-id={dataTestId}
                id={name}
                {...register(name, rules)}
                h={12}
                variant='default'
                placeholder={placeholder}
                borderColor={errors[name] ? 'red.500' : '#d7ff94'}
                borderWidth={errors[name] ? '2px' : '1px'}
                onBlur={handleTrimOnBlur}
            />
            {helperText && (
                <Text
                    fontWeight={400}
                    fontSize={12}
                    lineHeight='133%'
                    color='rgba(0, 0, 0, 0.64)'
                    w='100%'
                    mt={1}
                >
                    {helperText}
                </Text>
            )}
            {errors[name] && (
                <Text
                    fontWeight={400}
                    fontSize={12}
                    lineHeight='133%'
                    color='red.500'
                    w='100%'
                    mt={1}
                >
                    {errors[name].message?.toString()}
                </Text>
            )}
        </VStack>
    );
}
