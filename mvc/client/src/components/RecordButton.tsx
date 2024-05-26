import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Select,
	FormControl,
	FormLabel,
	Divider,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";

interface IRecordData {
	rednibrojkruga: number;
	brojbodova: number;
	idtima: number;
}

interface ITeamData {
	id: number;
	naziv: string;
}

export const RecordButton: FC<{
	quizId: number;
	brojkrugova: number;
	onSuccess: () => void;
}> = ({ quizId, brojkrugova, onSuccess }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRecordData>();
	const {
		register: registerNaziv,
		handleSubmit: handleNazivSubmit,
		reset,
	} = useForm<{
		naziv: string;
	}>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [teams, setTeams] = useState<ITeamData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetch("http://localhost:3001/team/znj4");
				const a = await result.json();

				setTeams(a.teams);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const onSubmit = (values: IRecordData) => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/record/create", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ ...values, idkviza: quizId }),
				});

				if (response.ok) {
					onSuccess();
					onClose();
				}
			} catch (error) {}
		};

		fetchData();
	};

	const onNazivSubmit = (values: { naziv: string }) => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/team/create", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ ...values }),
				});

				if (response.ok) {
					const result = await fetch("http://localhost:3001/team/znj4");
					const a = await result.json();

					setTeams(a.teams);
					reset();
				}
			} catch (error) {}
		};

		fetchData();
	};

	return (
		<>
			<Button onClick={onOpen}>Dodaj zapis</Button>

			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Dodaj zapis</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl>
								<FormLabel>Tim</FormLabel>
								<Select
									id="idtima"
									placeholder="Odaberi tim"
									{...register("idtima", {
										required: "Potrebno je odabrati tim",
									})}
								>
									{teams.map((team) => (
										<option key={team.id} value={team.id}>
											{team.naziv}
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl>
								<FormLabel>Krug</FormLabel>
								<Select
									id="rednibrojkruga"
									placeholder="Redni broj tima"
									{...register("rednibrojkruga", {
										required: "Potrebno je odabrati krug",
									})}
								>
									{Array.from(
										{ length: brojkrugova },
										(_, index) => index + 1
									).map((krug) => (
										<option key={`krug${krug}`} value={krug}>
											{krug}
										</option>
									))}
								</Select>
							</FormControl>
							<InputField
								mb={4}
								type="text"
								placeholder="Broj bodova"
								label="Broj bodova"
								errors={errors}
								{...register("brojbodova", {
									required: "Ovo polje je obavezno",
								})}
							/>
							<Button type="submit" mt={4} colorScheme="teal">
								Dodaj
							</Button>
						</form>
						<Divider mt={4} mb={4} />
						<form onSubmit={handleNazivSubmit(onNazivSubmit)}>
							<InputField
								type="text"
								placeholder="Naziv tima"
								label="Naziv tima"
								{...registerNaziv("naziv", {
									required: "Ovo polje je obavezno",
								})}
							/>
							<Button type="submit" mt={4} colorScheme="teal">
								Dodaj novi tim
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
