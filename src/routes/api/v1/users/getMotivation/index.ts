import { Users } from "../../../../../models";
import { GetMotivationRequest } from "./interface";
import { Response } from "express";

/**
 * respond with motivation
 *
 * @verb GET
 * @endpoint /api/v1/users/motivation
 * @version v1
 * @description the route will return a random motivation
 * @auth user+
 * @example
 *     GET /api/v1/users/motivation \
 *     --data { }
 */
export default async (req: GetMotivationRequest, res: Response) => {
	const { user } = req.body;
	try {
		res.send(user.getMovitation());
	} catch (error) {
		res.send({
			type: "no-motivation",
		});
	}
};
