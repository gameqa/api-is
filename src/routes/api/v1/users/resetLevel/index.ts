import { Response } from "express";
import { ResetLevelRequest } from "./interface";

/**
 * @verb POST
 * @endpoint /api/v1/users/reset_level
 * @version v1
 * @description the route will reset levels and update the current user.
 *     Allowing him to keep his progress but start again at lvl 1, from there he can level up
 *     and unlock chests again, increasing his chances to win a prize.
 *     This route responds with public view of the user.
 * @auth user+
 * @example
 *     POST /api/v1/users/reset_level \
 *     --data { }
 */
export default async (req: ResetLevelRequest, res: Response) => {
	try {
		await req.body.user.resetLevel();
		res.status(200).send(req.body.user.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
