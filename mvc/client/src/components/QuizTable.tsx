import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Text,
	Tr,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { IQuizData } from "../interfaces/IQuizData";

export const QuizTable: FC = () => {
	const [data, setData] = useState<Array<IQuizData>>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/quiz/znj4");
				const data = await response.json();
				setData(data.quizes);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<Accordion allowToggle>
			{data.map((quiz) => {
				return (
					<AccordionItem>
						<AccordionButton>
							<Box as="span" flex="1" textAlign="left">
								{quiz.naziv}
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
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

							<Button mb={8}>Dodaj zapis</Button>

							<Heading>Zapisi:</Heading>
							{Array.from(
								{ length: quiz.brojkrugova },
								(_, index) => index + 1
							).map((krug) => {
								return (
									<>
										<Text>{krug}. krug</Text>
										<Table>
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
												})}
											</Tbody>
										</Table>
									</>
								);
							})}
						</AccordionPanel>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
};
