import { Response } from "express";
import { GameRounds } from "../../../../../models";
import { ReadCurrentGameRoundRequest } from "./interface";

/**
 * GET current round for authorized user
 */
export default async (req: ReadCurrentGameRoundRequest, res: Response) => {
	try {
		const doc = await GameRounds.findByUserId(req.body.user._id);
		res.status(200).send(doc);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
