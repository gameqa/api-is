import { Response } from "express";
import { HiscorePlacementRequest } from "./interface";
import { PublicUser, Users } from "../../../../../models";

import * as Services from "../../../../../services";
/**
 * Route for getting hiscorePlacement of current user
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
