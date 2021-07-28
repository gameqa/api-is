import { Request, Response } from "express";
import * as Services from "../../../../services";
import * as Declerations from "./declerations";
import * as Utils from "./utils";

/**
 * @verb GET
 * @endpoint /api/charts/answers_per_day
 * @description returns an array of objects that represent
 *     answer count per day.
 * @auth none
 * @example
 *     GET /api/charts/answers_per_day \
 *     --data { }
 */
export default async (_: Request, res: Response) => {
	try {
		const CHACHE_KEY = "ANSWERS_PER_DAY";
		const CACHE_DURATION_SECONDS = 240;

		res.send(
			await Services.Cache.getOrSetTTL<Declerations.PerDate[]>(
				CHACHE_KEY,
				CACHE_DURATION_SECONDS,
				Utils.getAnswersPerDay
			)
		);
	} catch (error) {
		res.status(500).send({
			message: "Unable to get chart at this time",
		});
	}
};
