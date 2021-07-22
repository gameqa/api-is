import sgMail from "@sendgrid/mail";
import { AddressInfo, Template } from "./interface";
import { SENDGRID_KEY } from "../../utils";
sgMail.setApiKey(SENDGRID_KEY);

export class Sender {
	readonly addressing: AddressInfo;

	public constructor(addressInfo: AddressInfo) {
		this.addressing = addressInfo;
	}

	public async send(template: Template) {
		return new Promise((resolve, reject) => {
			sgMail.send(
				{
					from: this.addressing.from,
					subject: this.addressing.subject,
					templateId: template.templateId,
					replyTo: this.addressing.replyTo,
					personalizations: [
						{
							to: this.addressing.to.map((emailString) => ({
								email: emailString,
							})),
							bcc: [],
							dynamicTemplateData: template.data,
						},
					],
				},
				null,
				(error, _) => {
					if (error) return reject(error);
					return resolve(null);
				}
			);
		});
	}
}

export const DEFAULT_SENDER = "spurningarapp@ru.is";
export const REGISTER_USER_TEMPLATE = "d-848972f67bb94ba4a22e826ab6656bff";
export const RESET_PW_CODE_TEMPLATE = "d-87d0255b6c7e4bde9594ee435f4fc80d";
export const WEEKLY_WINNERS_TEMPLATE = "d-3c9addb0168445328e035b6244145fcd";
