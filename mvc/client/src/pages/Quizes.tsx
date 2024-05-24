import { FC } from "react";
import { Navigation } from "../components/Navigation";
import { QuizTable } from "../components/QuizTable";

export const Quizes: FC = () => {
	return (
		<>
			<Navigation />
			<QuizTable />
		</>
	);
};
