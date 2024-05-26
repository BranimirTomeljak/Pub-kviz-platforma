import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { ChakraProvider } from "@chakra-ui/react";
import { IInputField, InputField } from "../components/InputField";

// Wrapper to include Chakra UI and react-hook-form context
const Wrapper: React.FC<{ children: ReactElement }> = ({ children }) => {
	const methods = useForm();
	return (
		<ChakraProvider>
			<FormProvider {...methods}>{children}</FormProvider>
		</ChakraProvider>
	);
};

describe("InputField component", () => {
	const defaultProps: IInputField = {
		name: "testInput",
		label: "Test Input",
		isRequired: true,
		errors: {},
	};

	it("renders without crashing", () => {
		render(
			<Wrapper>
				<InputField {...defaultProps} />
			</Wrapper>
		);
		expect(screen.getByText("Test Input")).toBeInTheDocument();
	});

	it("displays the label correctly", () => {
		render(
			<Wrapper>
				<InputField {...defaultProps} />
			</Wrapper>
		);
		expect(screen.getByText("Test Input")).toBeInTheDocument();
	});

	it("renders without a label if not provided", () => {
		render(
			<Wrapper>
				<InputField {...defaultProps} label={undefined} />
			</Wrapper>
		);
		expect(screen.queryByText("Test Input")).not.toBeInTheDocument();
	});

	it("does not display an error message when there is no error", () => {
		render(
			<Wrapper>
				<InputField {...defaultProps} />
			</Wrapper>
		);
		expect(
			screen.queryByText("This field is required")
		).not.toBeInTheDocument();
	});
});
