import { FC, useEffect, useState } from "react";
import { InputField } from "./InputField";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Select,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface QuizFormProps {
	naziv: string;
	opis: string;
	maxbrojtimova: number;
	maxvelicinatima: number;
	datum: Date;
	trajanje: number;
	brojkrugova: number;
	idLokala: string;
}

export const QuizForm: FC<{ userId: any }> = ({ userId }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<QuizFormProps>();
	const [places, setPlaces] = useState<any>([]);
	const toast = useToast();

	const onSubmit = (values: QuizFormProps) => {
		const place = places.find((place: { id: number }) => {
			return place.id === parseInt(values.idLokala);
		});

		if (place.kapacitet < values.maxbrojtimova * values.maxvelicinatima) {
			toast({
				title: "Greška",
				description: "Kapacitet lokala je manji od maksimalnog broja timova",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} else {
			fetch("http://localhost:3001/quiz/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...values, status: 0, userId }),
			});
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetch("http://localhost:3001/place/znj4");

				const a = await result.json();

				setPlaces(a.places);
			} catch (error) {}
		};

		fetchData();
	}, []);

	console.log(errors);

	return (
		<>
			<Box padding="10">
				<form onSubmit={handleSubmit(onSubmit)}>
					<InputField
						type="text"
						mb={4}
						isRequired
						placeholder="Naziv kviza"
						label="Naziv kviza"
						errors={errors}
						{...register("naziv", { required: "Potreban naziv" })}
					/>
					<InputField
						mb={4}
						isRequired
						type="text"
						placeholder="Opis kviza"
						label="Opis kviza"
						errors={errors}
						{...register("opis", { required: "Ovo polje je obavezno" })}
					/>
					<InputField
						mb={4}
						isRequired
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
						isRequired
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
						isRequired
						type="date"
						placeholder="Datum kviza"
						label="Datum kviza"
						errors={errors}
						{...register("datum", { required: "Ovo polje je obavezno" })}
					/>
					<InputField
						mb={4}
						isRequired
						type="number"
						placeholder="Trajanje kviza"
						label="Trajanje kviza"
						errors={errors}
						{...register("trajanje", { required: "Ovo polje je obavezno" })}
					/>
					<InputField
						mb={4}
						isRequired
						type="number"
						placeholder="Broj krugova"
						label="Broj krugova"
						errors={errors}
						{...register("brojkrugova", { required: "Ovo polje je obavezno" })}
					/>
					<FormControl>
						<FormLabel>Lokal</FormLabel>
						<Select
							id="idLokala"
							required
							placeholder="Lokal"
							{...register("idLokala", {
								required: "Potrebno je odabrati lokal",
							})}
						>
							{places.map(
								(place: { id: number; naziv: string; kapacitet: number }) => (
									<option key={`place${place.id}`} value={place.id}>
										{place.naziv} ({place.kapacitet})
									</option>
								)
							)}
						</Select>
					</FormControl>
					<Button type="submit" mt={4}>
						Submit
					</Button>
				</form>
			</Box>
		</>
	);
};
