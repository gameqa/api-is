import { Response } from "express";
import { QuestionsRequest } from "./interface";

import { Questions } from "../../../../../models";
/**
 * Route for getting hiscorePlacement of current user
 */
export default async (req: QuestionsRequest, res: Response) => {
	try {
		const { _id } = req.body.user;
		res.send(await Questions.findByUserIdAndPopulateAnswers(_id));
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
