import { Request, Response } from "express";
import * as Declerations from "./declerations";
import * as Utils from "./utils";
import * as Services from "../../../../services";

/**
 * @verb GET
 * @endpoint /api/charts/questions_per_day
 * @description returns an array of objects that represent
 *     questions count per day. Can accept a list of boolean
 *     query arguments. If invalid arguments are presented,
 *     then it will respond with error.
 *
 * @auth none
 * @example
 *     GET /api/charts/answers_per_day?archived=true&isImpossible=false \
 *     --data { }
 */
export default async (req: Request, res: Response) => {
	try {
		const queryObject = Utils.getQueryObject(
			req.query as Declerations.StringToString
		);

		// send the results and store them in cache temporarilly
		res.send(
			await Services.Cache.getOrSetTTL<Declerations.PerDate[]>(
				Utils.CHACHE_KEY,
				Utils.CACHE_DURATION_SECONDS,
				() => Utils.getQuestionsPerDay(queryObject)
			)
		);
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
};
