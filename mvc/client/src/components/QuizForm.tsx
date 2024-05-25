import { FC } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";

type QuizFormProps = {
	naziv: string;
	opis: string;
	maxBrojTimova: number;
	maxVelicinaTima: number;
	datum: Date;
	trajanje: number;
	brojKrugova: number;
};

export const QuizForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<QuizFormProps>();

	const onSubmit = (data: QuizFormProps) => {
		console.log(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField
					type="text"
					isRequired
					placeholder="Naziv kviza"
					label="Naziv kviza"
					errors={errors}
					{...register("naziv", { required: "Potreban naziv" })}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};
