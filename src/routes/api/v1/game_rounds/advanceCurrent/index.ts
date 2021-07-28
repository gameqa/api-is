import { Response } from "express";
import { GameRounds, TaskUserPayload } from "../../../../../models";
import { AdvanceCurrentGameRoundRequest } from "./interface";

/** TODO:
 * responds with GameRoundWithTask
 *
 * @verb POST
 * @endpoint /api/v1/game_rounds/
 * @version v1
 * @description advance round to next round for current user
 * @auth user+
 * @example
 *     POST /api/v1/game_rounds/:roundId/advance \
 *     --data { }
 */
export default async (req: AdvanceCurrentGameRoundRequest, res: Response) => {
	try {
		const { round, user } = req.body;
		if (round.userId.toString() !== req.body.user._id.toString())
			throw new Error("Unable to edit round for another user");
		const doc = await round.advance(
			// @ts-ignore
			req.body as TaskUserPayload,
			user
		);
		res.status(200).send(doc);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
