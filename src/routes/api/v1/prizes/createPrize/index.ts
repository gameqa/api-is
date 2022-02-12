import { Request, Response } from "express";
import { Prizes } from "../../../../../models";
import { CreatePrizeRequest } from "./interface";

export default async (req: CreatePrizeRequest, res: Response) => {
	try {
		// const prizeCategory = await PrizeCategories.create(req.body);

		res.status(201).send();
	} catch (error) {
		res.status(500).send({
			message: "Error while creating prize ",
		});
	}
};
