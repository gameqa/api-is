import { Users } from "../../../../../models";
import { CurrentInvitesRequest } from "./interface";
import { Response } from "express";

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
