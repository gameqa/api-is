import { Response, Request } from "express";
import { ArticleSources } from "../../../../../models";

/** 
 * @verb POST
 * @endpoint /api/v1/article_sources/
 * @version v1
 * @description this endpoint creates an ArticleSources Document
 * @auth admin
 * @example
 *     POST api/v1/article_sources/ \
 *     --data {
        logo: "https://image.flaticon.com/icons/png/512/48/48927.png",
        identifier: "__wiki__",
        hostname: "is.wikipedia.org",
        displayName: "Wikipedia",
    }
 */
export default async (req: Request, res: Response) => {
	try {
		const doc = await ArticleSources.create(req.body);
		res.status(201).send(doc);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
