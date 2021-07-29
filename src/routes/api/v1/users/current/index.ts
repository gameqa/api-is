import { Response } from "express";
import { CurrentUserRequest } from "./interface";

/**
 * @verb GET
 * @endpoint /api/v1/users/current
 * @version v1
 * @description this route will respond with a public view of the current user
 * @auth user+
 * @example
 *     GET /api/v1/users/current \
 *     --data { }
 */
export default async (req: CurrentUserRequest, res: Response) => {
	try {
		res.send(req.body.user.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
