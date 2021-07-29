import { Response } from "express";
import _ from "lodash";
import { Answers } from "../../../../../models";
import { PatchByIdRequest } from "./interface";

/**
 * @verb PATCH
 * @endpoint /api/v1/answers/:id
 * @version v1
 * @description provided a valid id the route will update and return a public view
 *     of the answer
 * @auth user+
 * @example
 *     PATCH /api/v1/answers/507f191e810c19729de860ea \
 *     --data {
 * 			seenByQuestionerAt: "2021-06-15T00:00:00.000Z"}
 */
export default async (req: PatchByIdRequest, res: Response) => {
	try {
		/** Pick only allowed values */
		const body = _.pick(req.body, ["seenByQuestionerAt"]);
		const doc = await Answers.findByIdAndUpdate(
			req.body.answer._id,
			{ $set: body },
			{ new: true }
		);
		res.send(await doc.toPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
