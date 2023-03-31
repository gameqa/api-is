import { Response } from "express";

import * as Services from "../../../../services";
import { WeekDays, Months } from "../interface";
import { SendNotificationRequest } from "./interface";

/**
 * Probably not in use..
 */

export default async (req: SendNotificationRequest, res: Response) => {
	try {
		const { date, time, prizeCategory, prize, lvl } = req.body;
		const date_date = new Date(date);
		const month_day = date_date.getDate();
		const month = Months[date_date.getMonth()];
		const day = WeekDays[date_date.getDay()];
		// TODO: ekki bara senda a mig
		await Services.PushNotifications.send(
			"Útdráttur!",
			{
				email: "",
				"pushNotificationTokens.0": { $exists: true },
			},
			(user) => ({
				to: user.pushNotificationTokens,
				sound: "default",
				title: `Útdráttur á ${month_day}. ${month}`,
				body: `Þú hefur spilað ${user.dailyStreak} daga í röð, ekki láta syrpuna þína enda í dag.`,
			})
		);

		res.status(200).send("");
	} catch (error) {
		res.status(400).send({ message: "Didn't send" });
	}
};
