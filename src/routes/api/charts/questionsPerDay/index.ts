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
		// declare constants
		const allowedQueryKeys = ["archived", "isImpossible", "isDisqualified"];
		const CHACHE_KEY = "questions:per:day";
		const CACHE_DURATION_SECONDS = 240;

		// object used in query
		const queryObject: Declerations.QueryObject = {};

		// pass valid boolean constraints in to query object if provided in req.query
		// this is done as express has poor support for boolean query values
		for (const key in req.query) {
			if (!allowedQueryKeys.includes(key))
				throw new Error(`${key} is not a valid query key`);
			queryObject[key] = req.query[key] === "false" ? false : true;
		}

		// send the results and store them in cache temporarilly
		res.send(
			await Services.Cache.getOrSetTTL<Declerations.PerDate[]>(
				CHACHE_KEY,
				CACHE_DURATION_SECONDS,
				() => Utils.getQuestionsPerDay(queryObject)
			)
		);
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
};
