import { Response } from "express";
import { ResetLevelRequest } from "./interface";

/**
 * @verb POST
 * @endpoint /api/v1/users/delete
 * @version v1
 * @description This route safe deletes a user by
 *     keeping the record (for database connections) but changes
 *     the information so as to delete user data
 * @auth user+
 * @example
 *     POST /api/v1/users/delete \
 *     --data { }
 */
export default async (req: ResetLevelRequest, res: Response) => {
	try {
		await req.body.user.safeDelete();
		res.status(200).send(req.body.user.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};