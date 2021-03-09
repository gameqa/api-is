import { Response } from "express";
import { ReadTopicByIdRequest } from "./interface";

export default async (req: ReadTopicByIdRequest, res: Response) => {
	try {
		res.send(req.body.topic);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
