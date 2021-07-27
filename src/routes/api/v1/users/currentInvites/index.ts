import { Users } from "../../../../../models";
import { CurrentInvitesRequest } from "./interface";
import { Response } from "express";

/**
 * returns all the list of public users invited by currenct user
 *
 * @verb GET
 * @endpoint /api/v1/users/current/invites
 * @deprecated no longer in use
 * @version v1
 * @description
 * @auth user+
 * @example
 *     GET /api/v1/users/current/invites \
 *     --data { }
 */
export default async (req: CurrentInvitesRequest, res: Response) => {
	const { user } = req.body;
	try {
		const docs = await Users.find({ invitedBy: user._id });
		res.send(docs.map((doc) => doc.getPublic()));
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
};
