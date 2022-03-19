import { Response } from "express";
import { SendEmailRequest } from "./interface";
import { WeekDays, Months } from "../interface";

import * as Services from "../../../../services";

// TODO: send to everyone with allowEmail = true
export default async (req: SendEmailRequest, res: Response) => {
	try {
		const { date, img, prizeCategory, lvl, prize } = req.body;

		const date_date = new Date(date);
		const month_day = date_date.getDate();
		const month = Months[date_date.getMonth()];
		const day = WeekDays[date_date.getDay()];
		const format_date = `${month_day}. ${month}`;
		await new Services.DynamicEmail.Sender({
			to: [Services.DynamicEmail.DEFAULT_SENDER],
			from: Services.DynamicEmail.DEFAULT_SENDER,
			subject: `Útdráttur á ${month_day}. ${month}`,
		}).send({
			templateId: Services.DynamicEmail.EMAIL_GIVEAWAY_ANNOUNCEMENT_TEMPLATE,
			data: {
				day: day,
				date: format_date,
				img: img,
				lvl: lvl,
				prizeCategory: prizeCategory,
				prize: prize,
			},
		});
		res.status(200).send("Email successfully sent");
	} catch (error) {
		res.status(400).send({ message: "Send email failed," });
	}
};
