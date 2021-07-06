import { Response } from "express";
import { GetByIdRequest } from "./interface";

/**
 * GET answer by id
 */
export default async (req: GetByIdRequest, res: Response) => {
	try {
		const answer = await req.body.answer.toPublic();
		res.send(answer);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
