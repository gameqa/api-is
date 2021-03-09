import { Response } from "express";
import { CreateAnswerRequest } from "./interface";
import { Answers } from "../../../../../models";

export default async (req: CreateAnswerRequest, res: Response) => {
	try {
		const answer = await Answers.create({
			...req.body,
			submittedBy: req.body.user._id,
			questionId: req.body.question._id,
		});
		res.status(201).send(answer);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
