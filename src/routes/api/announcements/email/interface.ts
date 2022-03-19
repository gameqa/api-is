export interface SendEmailRequest {
	body: {
		date: string;
		prizeCategory: string;
		lvl: string;
		img: string;
	};
}

export enum WeekDays {
	Sunnudagur = 0,
	Mánudagur = 1,
	Þriðjudagur = 2,
	Miðvikudagur = 3,
	Fimmtudagur = 4,
	Föstudagur = 5,
	Laugardagur = 6,
}

export enum Months {
	Janúar,
	Febrúar,
	Mars,
	Apríl,
	Maí,
	Júní,
	Júlí,
	Ágúst,
	September,
	Október,
	Nóvember,
	Desember,
}
