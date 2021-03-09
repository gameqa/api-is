import { Response } from "express";
import { ReadParagraphByIdRequest } from "./interface";

export default async (req: ReadParagraphByIdRequest, res: Response) => {
	try {
		res.send(req.body.paragraph);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
