import { Response } from "express";
import { GetByIdRequest } from "./interface";

/**
 * GET answer by id
 */
export default async (req: GetByIdRequest, res: Response) => {
	try {
		const answer = await req.body.answer;
		const publicViewOfAnswer = await answer.toPublic();
		const cacheAge = !!answer.answeredAt ? "86400" : "300";
		res
			.set("Cache-Control", `public, max-age=${cacheAge}`)
			.send(publicViewOfAnswer);
	} catch (error) {
		console.log(error.message);
		res.status(400).send({ message: error.message });
	}
};
