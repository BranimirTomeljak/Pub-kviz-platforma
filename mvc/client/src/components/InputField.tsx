import { forwardRef } from "react";
import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { FieldValues } from "react-hook-form";

export interface IInputField extends InputProps {
	label?: string;
	errors?: FieldValues;
	isRequired?: boolean;
	name: string;
}

export const InputField = forwardRef<HTMLInputElement, IInputField>(
	({ errors, name, label, isRequired = false, ...rest }, ref) => {
		return (
			<FormControl
				id={name}
				isRequired={isRequired}
				isInvalid={Boolean(errors?.[name])}
			>
				{label && <FormLabel htmlFor={name}>{label}</FormLabel>}
				<Input ref={ref} name={name} {...rest} />
			</FormControl>
		);
	}
);
