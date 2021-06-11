import { Users } from "../../../../../models";
import { GetMotivationRequest } from "./interface";
import { Response } from "express";

export default async (req: GetMotivationRequest, res: Response) => {
	const { user } = req.body;
	try {
		res.send(user.getMovitation());
	} catch (error) {
		res.send({
			type: "no-motivation",
		});
	}
};
