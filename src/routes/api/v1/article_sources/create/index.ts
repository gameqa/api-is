import { Response, Request } from "express";
import { ArticleSources } from "../../../../../models";
/**
 * POST article_source
 */
/** TODO:
 * responds with ArticleSourcesInterface
 *
 * @verb POST
 * @endpoint /api/v1/article_sources/
 * @version v1
 * @description this endpoint creates a document of type ArticleSourcesInterface
 * @auth user+
 * @example
 *     POST api/v1/article_sources/ \
 *     --data { }
 */
export default async (req: Request, res: Response) => {
	try {
		const doc = await ArticleSources.create(req.body);
		res.status(201).send(doc);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
