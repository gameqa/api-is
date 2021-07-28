import { Response } from "express";
import { CompleteTutorialRequest } from "./interface";

/**TODO:
 * responds with PublicUser
 *
 * @verb PATCH
 * @endpoint /api/v1/users/push_notification_tokens
 * @version v1
 * @description Route for adding the push notification token to user document
 * @auth user+
 * @example
 *     PATCH /api/v1/users/push_notification_tokens \
 *     --data { 
 * 				user: UserInterface;
				token: string; }
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
