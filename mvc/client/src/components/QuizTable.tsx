import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	Box,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

export const QuizTable: FC = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/quiz/znj4");
				const data = await response.json();
				setData(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<Accordion>
			{data.map((quiz: any) => {
				return (
					<AccordionItem>
						<AccordionButton>
							<Box as="span" flex="1" textAlign="left">
								{quiz.naziv}
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
};
