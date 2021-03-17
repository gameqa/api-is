import { Response, Request } from "express";
import { ArticleSources } from "../../../../../models";
/**
 * GET article_source
 */
export default async (req: Request, res: Response) => {
	try {
		const docs = await ArticleSources.find();
		res.status(200).send(docs);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
