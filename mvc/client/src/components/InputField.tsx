import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	InputProps,
	forwardRef,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldValues } from "react-hook-form";

export interface IInputField extends InputProps {
	label?: string;
	errors?: FieldValues;
	isRequired?: boolean;
	name: string;
}

export const InputField = forwardRef<IInputField, "input">(function InputField(
	{ errors, name, label, isRequired = false, ...rest },
	ref
) {
	return (
		<FormControl id={name} isRequired={isRequired}>
			{label && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<Input ref={ref} name={name} {...rest} />
			<FormErrorMessage color="red">
				<ErrorMessage errors={errors} name={name} />
			</FormErrorMessage>
		</FormControl>
	);
});
