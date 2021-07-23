import { Request, Response } from "express";
import { PrizeCategories, Prizes } from "../../../../../../../models";

export default async (req: Request, res: Response) => {
	try {
		const prizeCategory = await PrizeCategories.findById(
			"60f191964c39880ce5a9e547"
		);

		const prize = await Prizes.create({
			...req.body,
			prizeCategory: prizeCategory,
		});

		res.send(prize);
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
};
