import { Response } from "express";
import { CompleteTutorialRequest } from "./interface";
/**
 * Route for adding the push notification token to user document
 */
export default async (req: CompleteTutorialRequest, res: Response) => {
	try {
		if (!req.body.token) throw new Error("Token missing");
		await req.body.user.update({
			$addToSet: { pushNotificationTokens: req.body.token },
		});
		res.send(req.body.user.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
