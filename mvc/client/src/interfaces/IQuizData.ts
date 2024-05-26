export interface IQuizData {
	brojkrugova: number;
	datum: string;
	id: number;
	maxbrojtimova: number;
	maxvelicinatima: number;
	naziv: string;
	opis: string;
	status: number;
	trajanje: number;
	Pripadas: Array<{
		Zapi: {
			brojbodova: number;
			rednibrojkruga: number;
			Tim: { naziv: string };
		};
	}>;
	OdrzavanjeKvizas: Array<{
		idkviza: number;
		idlokala: number;
		idorganizatora: number;
		Organizator: { id: number; Korisnik: { id: number; email: string } };
	}>;
}
