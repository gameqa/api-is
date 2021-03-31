import sgMail from "@sendgrid/mail";
import { AddressInfo, Template } from "./interface";
import { SENDGRID_KEY } from "../../utils";
sgMail.setApiKey(SENDGRID_KEY);

export class DynamicEmailTemplates {
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
				(error, response) => {
					console.log(error, response);
					if (error) return reject(null);
					return resolve(null);
				}
			);
		});
	}
}
