import { FC } from "react";
import { InputField } from "./InputField";
import { Box, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface QuizFormProps {
	naziv: string;
	opis: string;
	maxbrojtimova: number;
	maxvelicinatima: number;
	datum: Date;
	trajanje: number;
	brojkrugova: number;
}

export const QuizForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<QuizFormProps>();

	const onSubmit = (values: QuizFormProps) => {
		fetch("http://localhost:3001/quiz/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...values, status: 0 }),
		});
	};

	return (
		<>
			<Box padding="10">
				<form onSubmit={handleSubmit(onSubmit)}>
					<InputField
						mb={4}
						type="text"
						placeholder="Naziv kviza"
						label="Naziv kviza"
						errors={errors}
						{...register("naziv", { required: "Ovo polje je obavezno" })}
					/>
					<InputField
						mb={4}
						type="text"
						placeholder="Opis kviza"
						label="Opis kviza"
						errors={errors}
						{...register("opis", { required: "Ovo polje je obavezno" })}
					/>
					<InputField
						mb={4}
						type="number"
						placeholder="Maksimalan broj timova"
						label="Maksimalan broj timova"
						errors={errors}
						{...register("maxbrojtimova", {
							required: "Ovo polje je obavezno",
						})}
					/>
					<InputField
						mb={4}
						type="number"
						placeholder="Maksimalna velicina tima"
						label="Maksimalna velicina tima"
						errors={errors}
						{...register("maxvelicinatima", {
							required: "Ovo polje je obavezno",
						})}
					/>
					<InputField
						mb={4}
						type="date"
						placeholder="Datum kviza"
						label="Datum kviza"
						errors={errors}
						{...register("datum", { required: "Ovo polje je obavezno" })}
					/>
					<InputField
						mb={4}
						type="number"
						placeholder="Trajanje kviza"
						label="Trajanje kviza"
						errors={errors}
						{...register("trajanje", { required: "Ovo polje je obavezno" })}
					/>
					<InputField
						mb={4}
						type="number"
						placeholder="Broj krugova"
						label="Broj krugova"
						errors={errors}
						{...register("brojkrugova", { required: "Ovo polje je obavezno" })}
					/>
					<Button type="submit" mt={4}>
						Submit
					</Button>
				</form>
			</Box>
		</>
	);
};
