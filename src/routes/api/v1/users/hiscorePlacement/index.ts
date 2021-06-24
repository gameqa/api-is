import { Response } from "express";
import { HiscorePlacementRequest } from "./interface";
/**
 * Route for getting hiscorePlacement of current user
 */
export default async (req: HiscorePlacementRequest, res: Response) => {
	try {
		res.send(await req.body.user.getHighscoreList());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
