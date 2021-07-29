import { Response } from "express";
import { HiscorePlacementRequest } from "./interface";
import { PublicUser, Users } from "../../../../../models";

import * as Services from "../../../../../services";

/**
 * @verb GET
 * @endpoint /api/v1/users/hiscore_placement
 * @version v1
 * @description this route responds with a list of users order by highscore rank
 *     by default the route selects users based on the highscore placement of the current user,
 *     but allows query parameters "offset" and "limit".
 *     "Offset" refers to the first user in the response array
 *     "Limit" refers to the length of the response array
 * @auth user+
 * @example
 *     GET /api/v1/users/hiscore_placement?offset=15&limit=20 \
 *     --data { }
 */
export default async (req: HiscorePlacementRequest, res: Response) => {
	const DEFAULT_LIMIT = 10;
	const SHIFT_VALUE = 5;
	const CACHE_KEY = "SORTED_HISCORE_LIST";
	const CACHE_TIME = 15;

	try {
		// calculate default offset, if not supplied by req
		const offset =
			Number(
				req.query.offset ?? Math.max(1, req.body.user.hiscoreRank - SHIFT_VALUE)
			) - 1;

		// get default or given limit
		const limit = Number(req.query.limit ?? DEFAULT_LIMIT);

		// use cache get or set to receive the users
		const users = await Services.Cache.getOrSetTTL<PublicUser[]>(
			CACHE_KEY,
			CACHE_TIME,
			async () => {
				const users = await Users.find().sort({ hiscoreRank: 1 });
				return users.map((user) => user.getPublic());
			}
		);

		res.send(users.slice(offset, offset + limit));
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
