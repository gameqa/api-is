import { Response } from "express";
import { CurrentUserRequest } from "./interface";
/**
 * Route for getting score card of current user
 */
export default async (req: CurrentUserRequest, res: Response) => {
	try {
		res.send(req.body.user.getPublic().scoreCard);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
