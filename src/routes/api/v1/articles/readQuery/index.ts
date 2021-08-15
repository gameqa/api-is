import { Response } from "express";
import { Articles } from "../../../../../models";
import { ReadQueryRequest } from "./interface";

/**
 * @verb GET
 * @endpoint /api/v1/articles/
 * @version v1
 * @description provided with a query string for google search
 *  the route responds with an array of article previews
 * @auth user+
 * @example
 *     GET /api/v1/articles?query=Obama \
 *     --data { }
 */
export default async (req: ReadQueryRequest, res: Response) => {
	try {
		//confirm query string is for google search
		if (!req.query.query) throw new Error("query parameter missing");
		// DO websearch with the google search query string
		const docs = await Articles.webSearch(req.query.query);
		res.status(200).send(docs);
	} catch (error) {
		console.log(error);
		res.status(500).send(
			error.response?.data ?? {
				message: "something unexpected went wrong in search",
			}
		);
	}
};
