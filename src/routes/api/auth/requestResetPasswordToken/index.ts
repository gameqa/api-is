import { Users } from "../../../../models";
import { Response } from "express";
import { RequestTokenRequest } from "./interface";

/**
 * @verb POST
 * @endpoint /api/auth/request_reset_password_token
 * @version v1
 * @description provided with valid email and valid reset code
 *     to reset password (which user got via email), generate
 *     token and send it in HTTP response to user so he can change
 *     his password
 * @example
 *     POST /api/auth/authenticate \
 *     --data {
 * 				email: "docs@spurningar.is",
 * 				code:  "12345678"
 * 		}
 */
export default async (req: RequestTokenRequest, res: Response) => {
	/**
	 * STEP 2 OF RESETTING PASSWORD
	 * A user that has already requested (and received) a code via email
	 * to reset his password can submit the code via this endpoint
	 * and get back a token which will allow the holder of that token
	 * to reset his password
	 */
	try {
		// verify code from email
		const token = await Users.findByEmailAndRequestResetPasswordToken(
			req.body.email,
			req.body.code
		);

		// send the token
		res.send({ token });
	} catch (error) {
		// the code must have been incorrect
		res.status(400).send({
			message: "Invalid code",
		});
	}
};
