import { Response } from "express";
import { Articles } from "../../../../../models";
import { ReadByKeyRequest } from "./interface";
/**
 * GET article by key
 */
export default async (req: ReadByKeyRequest, res: Response) => {
	try {
		const { sourceIdentifier, articleKey } = req.params;
		const doc = await Articles.findArticleByKey(
			sourceIdentifier,
			encodeURI(articleKey)
		);
		await doc.getSource();
		res.status(200).send({
			...doc.toObject(),
			source: doc.source,
		});
	} catch (error) {
		res.status(404).send({ message: error.message });
	}
};
