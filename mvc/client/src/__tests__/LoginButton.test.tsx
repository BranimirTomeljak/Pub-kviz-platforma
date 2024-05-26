import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/LoginButton";

// Mock the useAuth0 hook
jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>;

describe("LoginButton component", () => {
	it("renders without crashing", () => {
		mockedUseAuth0.mockReturnValue({
			loginWithRedirect: jest.fn(),
		} as any);

		render(<LoginButton />);
		expect(screen.getByText("Log in")).toBeInTheDocument();
	});

	it("calls loginWithRedirect when clicked", () => {
		const loginWithRedirectMock = jest.fn();
		mockedUseAuth0.mockReturnValue({
			loginWithRedirect: loginWithRedirectMock,
		} as any);

		render(<LoginButton />);
		const loginButton = screen.getByText("Log in");
		fireEvent.click(loginButton);

		expect(loginWithRedirectMock).toHaveBeenCalledTimes(1);
	});
});
