import { Users } from "../../../../../models";
import { VerificationCodeRequest } from "./interface";
import { Response } from "express";

export default async (req: VerificationCodeRequest, res: Response) => {
	const { user, verificationCode } = req.body;
	try {
		await user.verify(verificationCode ?? "");
		const doc = await Users.findById(user._id);
		res.send(doc.getPublic());
	} catch (error) {
		res.send({
			message: error.message,
		});
	}
};
