import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { IQuizData } from "../interfaces/IQuizData";
import { QuizTable } from "../components/QuizTable";

// Mock the useAuth0 hook
jest.mock("@auth0/auth0-react", () => ({
	useAuth0: jest.fn(),
}));

// Mock the fetch API
global.fetch = jest.fn();

const mockUser = { email: "testuser@example.com" };

const mockQuizes: Array<IQuizData> = [
	{
		brojkrugova: 3,
		datum: "2024-05-25",
		id: 1,
		maxbrojtimova: 10,
		maxvelicinatima: 5,
		naziv: "Test Quiz 1",
		opis: "Opis 1",
		status: 0,
		trajanje: 60,
		Pripadas: [],
		OdrzavanjeKvizas: [
			{
				idkviza: 1,
				idlokala: 1,
				idorganizatora: 1,
				Organizator: {
					id: 1,
					Korisnik: { id: 1, email: "testuser@example.com" },
				},
			},
		],
	},
	{
		brojkrugova: 2,
		datum: "2024-05-26",
		id: 2,
		maxbrojtimova: 8,
		maxvelicinatima: 4,
		naziv: "Test Quiz 2",
		opis: "Opis 2",
		status: 1,
		trajanje: 45,
		Pripadas: [],
		OdrzavanjeKvizas: [
			{
				idkviza: 2,
				idlokala: 2,
				idorganizatora: 2,
				Organizator: {
					id: 2,
					Korisnik: { id: 2, email: "anotheruser@example.com" },
				},
			},
		],
	},
];

describe("QuizTable component", () => {
	beforeEach(() => {
		(useAuth0 as jest.Mock).mockReturnValue({ user: mockUser });
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ quizes: mockQuizes }),
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders without crashing and fetches data", async () => {
		render(
			<ChakraProvider>
				<QuizTable />
			</ChakraProvider>
		);

		expect(
			screen.getByPlaceholderText("Pretrazi po nazivu")
		).toBeInTheDocument();
		expect(
			screen.getByText("Prikazi samo vlastite kvizove")
		).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText("Test Quiz 1")).toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
			expect(screen.getByText("Test Quiz 2")).toBeInTheDocument();
		});
	});

	it("filters quizzes to show only user's quizzes", async () => {
		render(
			<ChakraProvider>
				<QuizTable />
			</ChakraProvider>
		);

		await waitFor(() => {
			expect(screen.getByText("Test Quiz 1")).toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
			expect(screen.getByText("Test Quiz 2")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Prikazi samo vlastite kvizove"));

		await waitFor(() => {
			expect(screen.getByText("Test Quiz 1")).toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
			expect(screen.queryByText("Test Quiz 2")).not.toBeInTheDocument();
		});
	});
});
