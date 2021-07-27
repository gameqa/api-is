import { Users } from "../../../../../models";
import { VerificationCodeRequest } from "./interface";
import { Response } from "express";

/**
 * TODO:
 * Respond with PublicUser
 *
 * @verb POST
 * @endpoint /api/v1/users/verification_code
 * @version v1
 * @description this endpoint
 * @auth user+
 * @example
 *     GET /api/v1/users/verification_code \
 *     --data { }
 */
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
