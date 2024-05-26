import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IQuizData } from "../interfaces/IQuizData";
import { useAuth0 } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import { QuizAccordion } from "../components/QuizAccordion";

// Mock the useAuth0 hook
jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>;

const mockFetch = jest.fn();

global.fetch = mockFetch;

const mockQuiz: IQuizData = {
	id: 1,
	datum: "2024-05-25",
	naziv: "Test Quiz",
	opis: "This is a test quiz",
	trajanje: 60,
	status: 0,
	brojkrugova: 3,
	maxbrojtimova: 10,
	maxvelicinatima: 5,
	OdrzavanjeKvizas: [
		{
			idkviza: 1,
			idlokala: 1,
			idorganizatora: 1,
			Organizator: {
				id: 1,
				Korisnik: {
					id: 1,
					email: "organizer@example.com",
				},
			},
		},
	],
	Pripadas: [
		{
			Zapi: {
				rednibrojkruga: 1,
				brojbodova: 10,
				Tim: {
					naziv: "Team A",
				},
			},
		},
	],
};

describe("QuizAccordion component", () => {
	beforeEach(() => {
		mockedUseAuth0.mockReturnValue({
			user: { email: "organizer@example.com" },
		} as any);

		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({}),
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders without crashing", () => {
		render(
			<ChakraProvider>
				<QuizAccordion quiz={mockQuiz} />
			</ChakraProvider>
		);
		expect(screen.getByText("This is a test quiz")).toBeInTheDocument();
		expect(screen.getByText("Zapocni kviz")).toBeInTheDocument();
	});

	it("displays the correct quiz data", () => {
		render(
			<ChakraProvider>
				<QuizAccordion quiz={mockQuiz} />
			</ChakraProvider>
		);
		expect(screen.getByText("2024-05-25")).toBeInTheDocument();
		expect(screen.getByText("This is a test quiz")).toBeInTheDocument();
		expect(screen.getByText("60")).toBeInTheDocument();
		expect(screen.getByText("Neodrzan")).toBeInTheDocument();
	});

	it('calls updateQuizState when "Zapocni kviz" button is clicked', async () => {
		render(
			<ChakraProvider>
				<QuizAccordion quiz={mockQuiz} />
			</ChakraProvider>
		);

		fireEvent.click(screen.getByText("Zapocni kviz"));

		await waitFor(() => {
			expect(mockFetch).toHaveBeenCalledTimes(1);
			// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
			expect(mockFetch).toHaveBeenCalledWith(
				`http://localhost:3001/quiz/edit/1`,
				expect.objectContaining({
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ status: 1 }),
				})
			);
		});
	});

	it('displays "Zavrsi kviz" and RecordButton when status is 1', () => {
		const runningQuiz = { ...mockQuiz, status: 1 };
		render(
			<ChakraProvider>
				<QuizAccordion quiz={runningQuiz} />
			</ChakraProvider>
		);
		expect(screen.getByText("Zavrsi kviz")).toBeInTheDocument();
	});

	it("displays round data correctly", () => {
		render(
			<ChakraProvider>
				<QuizAccordion quiz={mockQuiz} />
			</ChakraProvider>
		);
		expect(screen.getByText("1. krug")).toBeInTheDocument();
		expect(screen.getByText("Team A")).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
	});
});
