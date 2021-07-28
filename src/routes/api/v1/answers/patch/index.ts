import { Response } from "express";
import _ from "lodash";
import { Answers } from "../../../../../models";
import { PatchByIdRequest } from "./interface";

/** TODO:
 * updates a single answer by id and respond with PublicAnswer
 *
 * @verb PATCH
 * @endpoint /api/v1/answers/:id
 * @version v1
 * @description provided a valid id the route will update and return a public view
 *     of the answer
 * @auth user+
 * @example
 *     PATCH /api/v1/answers/507f191e810c19729de860ea \
 *     --data { }
 */
export default async (req: PatchByIdRequest, res: Response) => {
	try {
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
