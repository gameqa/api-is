import { Request, Response } from "express";
import * as Utils from "./utils";
import * as Declerations from "./declerations";
import * as Services from "../../../../services";

/**
 * @verb GET
 * @endpoint /api/charts/users_per_day
 * @description returns an array of objects that represent
 *     users count per day. Can accept a list of boolean
 *     query arguments. If invalid arguments are presented,
 *     then it will respond with error.
 *
 * @auth none
 * @example
 *     GET /api/charts/users_per_day \
 *     --data { }
 */
export default async (req: Request, res: Response) => {
	try {
		const queryObject = Utils.getQueryObject(
			req.query as Declerations.StringToString
		);

		res.send(
			await Services.Cache.getOrSetTTL<Declerations.PerDate[]>(
				Utils.CHACHE_KEY,
				Utils.CACHE_DURATION_SECONDS,
				() => Utils.getUsersPerDay(queryObject)
			)
		);
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
};
