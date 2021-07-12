import { Request, Response } from "express";
import { PrizeCategories } from "../../../../../models";

export default async (req: Request, res: Response) => {
	try {
		const prizeCategory = await PrizeCategories.create(req.body);

		res.status(201).send(prizeCategory);
	} catch (error) {
		res.status(500).send({
			message: "Error while create prize categories",
		});
	}
};
