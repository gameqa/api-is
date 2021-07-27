import { Users } from "../../../../models";
import { Response } from "express";
import { RequestTokenRequest } from "./interface";

/**
 * responds with noting/undefined
 *
 * @verb POST
 * @endpoint /api/auth/request_reset_password_token
 * @version v1
 * @description provided with valid email and reset password code,
 * 		generate new reset password token
 * @auth user+
 * @example
 *     POST /api/auth/authenticate \
 *     --data {
 * 				email,
 * 				code
 * 			 }
 */
export default async (req: RequestTokenRequest, res: Response) => {
	try {
		const token = await Users.findByEmailAndRequestResetPasswordToken(
			req.body.email,
			req.body.code
		);
		res.send({ token });
	} catch (error) {
		console.log(`error`, error);
		res.status(400).send({
			message: "Invalid code",
		});
	}
};
