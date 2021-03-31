import { Users } from "../../../../../models";
import { VerificationCodeRequest } from "./interface";
import { Response } from "express";

export default async (req: VerificationCodeRequest, res: Response) => {
	const { user } = req.body;
	try {
		await user.setVerificationCode();
		res.send(user.getPublic());
	} catch (error) {
		res.send({
			message: error.message,
		});
	}
};
