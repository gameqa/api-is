import { Response } from "express";
import { GameRounds } from "../../../../../models";
import { ReadCurrentGameRoundRequest } from "./interface";

/**
 * @verb GET
 * @endpoint /api/v1/game_rounds/current
 * @version v1
 * @description the route responds with the current round for authorized user
 * @auth user+
 * @example
 *     GET /api/v1/game_rounds/current \
 *     --data { }
 */
export default async (req: ReadCurrentGameRoundRequest, res: Response) => {
	try {
		const doc = await GameRounds.findByUserId(req.body.user._id);
		res.status(200).send(doc);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
