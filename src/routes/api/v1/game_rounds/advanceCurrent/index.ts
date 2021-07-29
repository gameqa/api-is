import { Response } from "express";
import { TaskUserPayload } from "../../../../../models";
import { AdvanceCurrentGameRoundRequest } from "./interface";

/**
 * @verb POST
 * @endpoint /api/v1/game_rounds/
 * @version v1
 * @description takes information on the task the current user is finishing,
 *     and responds with a new GameRoundWithTask for the current user
 * @auth user+
 * @example
 *     POST /api/v1/game_rounds/507f191e810c19729de860ea/advance \
 *     --data { 
 * 			_id: "507f191e810c19729de860ea",
 * 			type: "make-question",
			text: "What is the capital of Iceland?",
 * 		}
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
