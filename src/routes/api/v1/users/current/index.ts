import { Response } from "express";
import { CurrentUserRequest } from "./interface";
/**
 * Route for sign up
 */
export default async (req: CurrentUserRequest, res: Response) => {
	try {
		res.send(req.body.user);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error.message });
	}
};
