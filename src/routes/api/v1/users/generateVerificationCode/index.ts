import { Users } from "../../../../../models";
import { VerificationCodeRequest } from "./interface";
import { Response } from "express";

/**
 * @verb POST
 * @endpoint /api/v1/users/verification_code/generate
 * @version v1
 * @description this route generates new verification and send by email,
 *     responds with public view of current user
 * @auth user+
 * @example
 *     GET /api/v1/users/verification_code/generate \
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
