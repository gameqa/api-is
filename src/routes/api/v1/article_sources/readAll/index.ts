import { Response, Request } from "express";
import { ArticleSources } from "../../../../../models";
/**
 * GET article_source
 */

/** TODO:
 * responds with ArticleSourcesInterface[]
 *
 * @verb GET
 * @endpoint /api/v1/article_sources/
 * @version v1
 * @description this endpoint returns document/s of type ArticleSouresInterface[]
 * @auth user+
 * @example
 *     GET api/v1/article_sources/ \
 *     --data { }
 */
export default async (req: Request, res: Response) => {
	try {
		const docs = await ArticleSources.find();
		res.status(200).send(docs);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
