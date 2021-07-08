import { Response } from "express";
import _ from "lodash";
import { Answers } from "../../../../../models";
import { PatchByIdRequest } from "./interface";

/**
 * PATCH answer by id
 */
export default async (req: PatchByIdRequest, res: Response) => {
	try {
		const body = _.pick(req.body, [
			"seenByQuestionerAt",
		]);
		const doc = await Answers.findByIdAndUpdate(req.body.answer._id, { $set: body }, { new: true });
		res.send(doc.toPublic());
	} catch (error) {
		console.log(error.message)
		res.status(400).send({ message: error.message });
	}
};
