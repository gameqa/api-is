import { Request, Response } from "express";
import { Prizes } from "../../../../../models";
import { CreatePrizeRequest } from "./interface";

export default async (req: CreatePrizeRequest, res: Response) => {
	try {
		// const prizeCategory = await PrizeCategories.create(req.body);
		console.log("body", req.body);
		const prize = await Prizes.create(req.body);
		res.status(201).send(prize);
	} catch (error) {
		res.status(500).send({
			message: "Error while creating prize ",
		});
	}
};
