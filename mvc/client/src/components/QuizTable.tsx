import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Heading,
	Table,
	Tbody,
	Td,
	Input,
	Th,
	Thead,
	Text,
	Tr,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { IQuizData } from "../interfaces/IQuizData";
import { QuizAccordion } from "./QuizAccordion";

export const QuizTable: FC = () => {
	const [data, setData] = useState<Array<IQuizData>>([]);
	const [filter, setFilter] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`http://localhost:3001/quiz/znj4?naziv=${filter}`
				);
				const data = await response.json();
				setData(data.quizes);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [filter]);

	return (
		<>
			<Box padding={4}>
				<Input
					placeholder="Pretrazi po nazivu"
					type="text"
					onChange={(event) => {
						setFilter(event.target.value);
					}}
				/>
			</Box>
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
								<QuizAccordion quiz={quiz} />
							</AccordionPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</>
	);
};
