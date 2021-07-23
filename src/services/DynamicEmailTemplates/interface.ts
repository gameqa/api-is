export interface AddressInfo {
	from: string;
	to: [string];
	subject: string;
	replyTo?: string;
}

export interface SignupTemplateData {
	templateId: "d-848972f67bb94ba4a22e826ab6656bff";
	data: {
		verificationCode: string;
	};
}

export interface ResetPasswordTemplateData {
	templateId: "d-87d0255b6c7e4bde9594ee435f4fc80d";
	data: {
		resetPasswordCode: string;
	};
}

export interface SendWeeklyWinners {
	templateId: "d-3c9addb0168445328e035b6244145fcd";
	data: {
		text: string;
	};
}

export type Template =
	| SendWeeklyWinners
	| SignupTemplateData
	| ResetPasswordTemplateData;
