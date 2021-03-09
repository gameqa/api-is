import { Response } from "express";
import { CreateTopicRequest } from "./interface";
import { Topics } from "../../../../../models";

export default async (req: CreateTopicRequest, res: Response) => {
	try {
		const topic = await Topics.create({
			...req.body,
			submittedBy: req.body.user._id,
		});
		res.send(topic);
	} catch (error) {
		res.status(400).send({ message: "Unable to create Topic" });
	}
};
