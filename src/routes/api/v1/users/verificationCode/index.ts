import { Users } from "../../../../../models";
import { VerificationCodeRequest } from "./interface";
import { Response } from "express";

/**
 * responds with PublicUser
 *
 * @verb POST
 * @endpoint /api/v1/users/verification_code
 * @version v1
 * @description provided a valid verification code the route will return a public view
 *     of the user
 * @auth user+
 * @example
 *     POST /api/v1/users/verification_code \
 *     --data { code }
 */
export default async (req: VerificationCodeRequest, res: Response) => {
	const { user, verificationCode } = req.body;
	try {
		await user.verify(verificationCode ?? "");
		const doc = await Users.findById(user._id);
		res.send(doc.getPublic());
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
};
