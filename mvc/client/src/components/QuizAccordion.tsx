import { FC, useState } from "react";
import { IQuizData } from "../interfaces/IQuizData";
import {
	Box,
	Button,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { RecordButton } from "./RecordButton";
import { useAuth0 } from "@auth0/auth0-react";

export const QuizAccordion: FC<{ quiz: IQuizData }> = ({ quiz }) => {
	const [trigger, setTrigger] = useState<boolean>(false);
	const { user } = useAuth0();

	const updateQuizState = async () => {
		const fetchData = async () => {
			try {
				const newStatus = quiz?.status === 0 ? 1 : 2;
				const response = await fetch(
					`http://localhost:3001/quiz/edit/${quiz?.id}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ status: newStatus }),
					}
				);

				if (response.ok) {
					setTrigger(!trigger);
				}
			} catch (error) {}
		};

		fetchData();
	};

	return (
		<>
			{quiz && (
				<Box padding={10}>
					<Table variant="simple" mb="8">
						<Thead>
							<Tr>
								<Th>Datum</Th>
								<Th>Opis</Th>
								<Th>Trajanje</Th>
								<Th>Status</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>{quiz.datum}</Td>
								<Td>{quiz.opis}</Td>
								<Td>{quiz.trajanje}</Td>
								<Td>
									{quiz.status === 0
										? "Neodrzan"
										: quiz.status === 1
										? "Traje"
										: "Zavrsio"}
								</Td>
							</Tr>
						</Tbody>
					</Table>

					{user?.email ===
						quiz.OdrzavanjeKvizas[0].Organizator.Korisnik.email &&
						quiz.status === 0 && (
							<Button onClick={updateQuizState}>Zapocni kviz</Button>
						)}

					{user?.email ===
						quiz.OdrzavanjeKvizas[0].Organizator.Korisnik.email &&
						quiz.status === 1 && (
							<Box>
								<RecordButton
									quizId={quiz.id}
									brojkrugova={quiz.brojkrugova}
									onSuccess={() => {
										setTrigger(!trigger);
									}}
								/>
								<Button onClick={updateQuizState} ml={8}>
									Zavrsi kviz
								</Button>
							</Box>
						)}

					<Heading mb={8} mt={8}>
						Zapisi:
					</Heading>
					{Array.from(
						{ length: quiz.brojkrugova },
						(_, index) => index + 1
					).map((krug) => {
						return (
							<>
								<Heading size="m">{krug}. krug</Heading>
								<Table mb={16}>
									<Thead>
										<Tr>
											<Th>Tim</Th>
											<Th>Broj Bodova</Th>
										</Tr>
									</Thead>
									<Tbody>
										{quiz.Pripadas.map((pripada) => {
											if (pripada.Zapi.rednibrojkruga === krug) {
												return (
													<Tr>
														<Td>{pripada.Zapi.brojbodova}</Td>
														<Td>{pripada.Zapi.Tim.naziv}</Td>
													</Tr>
												);
											}

											return null;
										})}
									</Tbody>
								</Table>
							</>
						);
					})}
				</Box>
			)}
		</>
	);
};
