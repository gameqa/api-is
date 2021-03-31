export interface AddressInfo {
	from: string;
	to: [string];
	subject: string;
	replyTo?: string;
}

export interface SignupTemplateData {
	templateId: "d-6853194ff96946c1b21c985d32aa5d3c";
	data: {
		verificationCode: string;
	};
}

export type Template = SignupTemplateData;
