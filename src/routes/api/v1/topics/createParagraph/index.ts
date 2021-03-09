import { Response } from "express";
import { CreateParagraphRequest } from "./interface";
import { Paragraphs } from "../../../../../models";

export default async (req: CreateParagraphRequest, res: Response) => {
	try {
		const { start, end } = req.body;
		if (!(start !== undefined && end !== undefined))
			throw new Error(
				"Need start and end words from topic to create paragraph"
			);
		const topicWords: string[] = req.body.topic.text.split(/[ \n\t\r]+/);
		if (start < 0) throw new Error("Start can not be negative");
		if (end >= topicWords.length)
			throw new Error("End can not be after end of text");
		const paragraph = await Paragraphs.create({
			context: topicWords.slice(start, end).join(" "),
			submittedBy: req.body.user._id,
			topicId: req.body.topic._id,
		});
		res.send(paragraph);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
