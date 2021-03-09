import { Response } from "express";
import { ReadQuestionByIdRequest } from "./interface";

export default async (req: ReadQuestionByIdRequest, res: Response) => {
	try {
		res.send(req.body.question);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
