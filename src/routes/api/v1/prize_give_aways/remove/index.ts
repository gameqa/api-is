import { Request, Response } from "express";
import { PrizeGiveAways } from "../../../../../models";

export default async (req: Request, res: Response) => {
	const { giveAwayId } = req.params;
	try {
		const deletedGiveAway = await PrizeGiveAways.findByIdAndDelete(giveAwayId);
		res.send(deletedGiveAway);
	} catch (error) {
		res.status(500).send("Error deleting giveaway");
	}
};
