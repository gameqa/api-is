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
		const offset =
			Number(
				req.query.offset ?? Math.max(1, req.body.user.hiscoreRank - SHIFT_VALUE)
			) - 1;
		const limit = Number(req.query.limit ?? DEFAULT_LIMIT);
		let users = await Services.Cache.get<PublicUser[]>(CACHE_KEY);
		if (!users) {
			users = (await Users.find().sort({ hiscoreRank: 1 })).map((user) => user.getPublic());
			await Services.Cache.setTTL<PublicUser[]>(
				CACHE_KEY,
				users,
				CACHE_TIME
			);
		}
		res.send(users.slice(offset, offset + limit));
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

// try {

// 	res.send(await req.body.user.getHighscoreList());
// } catch (error) {
// 	res.status(400).send({ message: error.message });
// }
