import { Request, Response } from "express";
import { Prizes } from "../../../../../../models";

export default async (req: Request, res: Response) => {
	try {
		const { prizeId } = req.params;
		const deletedPrize = await Prizes.findByIdAndDelete(prizeId);
		res.status(200).send(deletedPrize);
	} catch (error) {
		res.status(500).send({
			message: "Error while creating prize ",
		});
	}
};
