import { Response } from "express";
import _ from "lodash";
import { PatchByIdRequest } from "./interface";

/**
 * PATCH answer by id
 */
export default async (req: PatchByIdRequest, res: Response) => {
	try {
		const body = _.pick(req.body, [
			"seenByQuestionerAt",
		]);
		req.body.answer.update({ $set: body });
		res.send(req.body.answer.toPublic());
	} catch (error) {
		console.log(error.message)
		res.status(400).send({ message: error.message });
	}
};
