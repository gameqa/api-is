import _ from "lodash";
import { Request, Response } from "express";
import { Questions } from "../../../../../models";

export default async (req: Request, res: Response) => {
	try {
		const body = _.pick(req.body, [
			"archived",
			"isImpossible",
			"isDisqualified",
			"text",
		]);

		const doc = await Questions.findByIdAndUpdate(
			req.params.id,
			{
				$set: body,
			},
			{
				new: true,
			}
		);

		res.send(doc);
	} catch (error) {
		console.log(error);
		res.status(400).send("Error! Question patch unsuccessful");
	}
};
