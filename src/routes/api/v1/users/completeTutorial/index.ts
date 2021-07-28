import { Response } from "express";
import { CompleteTutorialRequest } from "./interface";
/**
 * Route for getting current user
 */

/**
 * responds with PublicUser
 * 
 * @deprecated no longer in use
 * @verb PATCH
 * @endpoint /api/v1/users/complete_tutorial
 * @version v1
 * @description provided a valid id the route will return a public view
 *     of the answer
 * @auth user+
 * @example
	   /api/v1/users/complete_tutorial \
 *     --data { }
 */
export default async (req: CompleteTutorialRequest, res: Response) => {
	try {
		await req.body.user.completeTutorial();
		res.send(req.body.user.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
