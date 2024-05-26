import React from "react";
import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigation } from "../components/Navigation";

// Mock the useAuth0 hook
jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>;

describe("Navigation component", () => {
	it("renders without crashing", () => {
		mockedUseAuth0.mockReturnValue({
			isAuthenticated: false,
			isLoading: false,
		} as any);

		render(<Navigation />);
		expect(screen.getByText("PKP")).toBeInTheDocument();
	});

	it("displays Home and Quizes links", () => {
		mockedUseAuth0.mockReturnValue({
			isAuthenticated: false,
			isLoading: false,
		} as any);

		render(<Navigation />);
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Quizes")).toBeInTheDocument();
	});

	it("displays LoginButton when not authenticated", () => {
		mockedUseAuth0.mockReturnValue({
			isAuthenticated: false,
			isLoading: false,
		} as any);

		render(<Navigation />);
		expect(screen.getByText("Log in")).toBeInTheDocument();
	});

	it("displays LogoutButton when authenticated", () => {
		mockedUseAuth0.mockReturnValue({
			isAuthenticated: true,
			isLoading: false,
		} as any);

		render(<Navigation />);
		expect(screen.getByText("Log out")).toBeInTheDocument();
	});

	it("does not display buttons when loading", () => {
		mockedUseAuth0.mockReturnValue({
			isAuthenticated: false,
			isLoading: true,
		} as any);

		render(<Navigation />);
		expect(screen.queryByText("Log in")).not.toBeInTheDocument();
		expect(screen.queryByText("Log out")).not.toBeInTheDocument();
	});
});
