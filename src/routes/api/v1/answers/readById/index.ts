import { Response } from "express";
import { ReadAnswerByIdRequest } from "./interface";

export default async (req: ReadAnswerByIdRequest, res: Response) => {
	try {
		res.send(req.body.answer);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
