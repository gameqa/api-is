import { Response } from "express";
import { CompleteTutorialRequest } from "./interface";
/**
 * Route for getting current user
 */
export default async (req: CompleteTutorialRequest, res: Response) => {
	try {
		await req.body.user.completeTutorial();
		res.send(req.body.user.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
