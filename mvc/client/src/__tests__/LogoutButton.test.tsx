import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../components/LogoutButton";

// Mock the useAuth0 hook
jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>;

describe("LogoutButton component", () => {
	it("renders without crashing", () => {
		mockedUseAuth0.mockReturnValue({
			logout: jest.fn(),
		} as any);

		render(<LogoutButton />);
		expect(screen.getByText("Log out")).toBeInTheDocument();
	});

	it("calls logout with the correct parameters when clicked", () => {
		const logoutMock = jest.fn();
		mockedUseAuth0.mockReturnValue({
			logout: logoutMock,
		} as any);

		render(<LogoutButton />);
		const logoutButton = screen.getByText("Log out");
		fireEvent.click(logoutButton);

		expect(logoutMock).toHaveBeenCalledWith({
			logoutParams: { returnTo: window.location.origin },
		});
		expect(logoutMock).toHaveBeenCalledTimes(1);
	});
});
