import { Response } from "express";
import { ResetLevelRequest } from "./interface";

/**
 * Route for reset level
 */
export default async (req: ResetLevelRequest, res: Response) => {
	try {
		await req.body.user.resetLevel();
		res.status(200).send(req.body.user.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
