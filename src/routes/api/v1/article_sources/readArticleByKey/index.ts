import { Response } from "express";
import { Articles } from "../../../../../models";
import { ReadByKeyRequest } from "./interface";

/**
 * @verb GET
 * @endpoint /api/v1/article_sources/:sourceIdentifier/article/:articleKey
 * @version v1
 * @description provided a valid sourceIdentifier and valid articleKey the route
 *     responds with the article
 * @auth user+
 * @example
 *     GET api/v1/article_sources/__wiki__/article/Barack_Obama \
 *     --data { }
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
