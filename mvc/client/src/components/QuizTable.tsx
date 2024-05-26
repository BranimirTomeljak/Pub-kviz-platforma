import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Checkbox,
	Input,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { IQuizData } from "../interfaces/IQuizData";
import { QuizAccordion } from "./QuizAccordion";
import { useAuth0 } from "@auth0/auth0-react";

export const QuizTable: FC = () => {
	const [data, setData] = useState<Array<IQuizData>>([]);
	const [filter, setFilter] = useState<string>("");
	const [showUserQuizes, setShowUserQuizes] = useState<boolean>(false);
	const { user } = useAuth0();

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
				<Checkbox onChange={(event) => setShowUserQuizes(event.target.checked)}>
					Prikazi samo vlastite kvizove
				</Checkbox>
			</Box>
			<Accordion allowToggle>
				{data
					.filter((quiz) => {
						if (!showUserQuizes) {
							return true;
						}
						if (user) {
							return (
								user.email ===
								quiz.OdrzavanjeKvizas[0].Organizator?.Korisnik.email
							);
						}
						return false;
					})
					.map((quiz) => {
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
