import { Response, Request } from "express";
import { ArticleSources } from "../../../../../models";

/**
 *
 * @verb GET
 * @endpoint /api/v1/article_sources/
 * @version v1
 * @description this endpoint returns all Article sources
 * @auth user+
 * @example
 *     GET api/v1/article_sources/ \
 *     --data { }
 */
export default async (_: Request, res: Response) => {
	try {
		const docs = await ArticleSources.find();
		res.status(200).send(docs);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
