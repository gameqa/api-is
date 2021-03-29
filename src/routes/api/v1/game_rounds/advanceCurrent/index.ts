import { Response } from "express";
import { GameRounds, TaskUserPayload } from "../../../../../models";
import { AdvanceCurrentGameRoundRequest } from "./interface";

/**
 * GET current round for authorized user
 */
export default async (
	req: AdvanceCurrentGameRoundRequest,
	res: Response
) => {
	try {
		const { round, user } = req.body;
		if (round.userId.toString() !== req.body.user._id.toString())
			throw new Error("Unable to edit round for another user");
		console.log(user);
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
