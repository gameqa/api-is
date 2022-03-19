import { Response } from "express";
import { SendEmailRequest, Months } from "./interface";

import * as Services from "../../../../services";

export default async (req: SendEmailRequest, res: Response) => {
	try {
		const { date, img, prizeCategory, lvl } = req.body;

		const date_date = new Date(date);
		const month_day = date_date.getDate();
		console.log(month_day, "dagsetning i man");
		const month = Months[date_date.getMonth()];
		const format_date = `${month_day}. ${month}`;
		await new Services.DynamicEmail.Sender({
			to: [Services.DynamicEmail.DEFAULT_SENDER],
			from: Services.DynamicEmail.DEFAULT_SENDER,
			subject: `Útdráttur á ${month_day}. ${month}`,
		}).send({
			templateId: Services.DynamicEmail.EMAIL_GIVEAWAY_ANNOUNCEMENT_TEMPLATE,
			data: {
				date: format_date,
				img: img,
				lvl: lvl,
				prizeCategory: prizeCategory,
			},
		});
		res.status(200).send("Email successfully sent");
	} catch (error) {
		res.status(400).send({ message: "Send email failed," });
	}
};
