import { Users } from "../../../../../models";
import { CurrentInvitesRequest } from "./interface";
import { Response } from "express";

/**
 * @verb GET
 * @endpoint /api/v1/users/current/invites
 * @deprecated no longer in use
 * @version v1
 * @description returns all the list of public view of users invited by current user
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
