import { Response } from "express";
import { CreateQuestionRequest } from "./interface";
import { Questions } from "../../../../../models";

export default async (req: CreateQuestionRequest, res: Response) => {
	try {
		const question = await Questions.create({
			...req.body,
			submittedBy: req.body.user._id,
			paragraphId: req.body.paragraph._id,
		});
		res.status(201).send(question);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
