import { Request, Response } from "express";
import { CreateGiveAwayRequest } from "./interface";
import { PrizeGiveAways } from "../../../../../models";

export default async (req: CreateGiveAwayRequest, res: Response) => {
	try {
		const date = new Date(req.body.time);
		const time = date.getTime();

		const prizeGiveAway = await PrizeGiveAways.create({ time: time });

		res.send(prizeGiveAway);
	} catch (error) {
		res.status(500).send("Error creating giveaway");
	}
};
