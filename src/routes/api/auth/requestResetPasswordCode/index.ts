import { Users, AuthTokens } from "../../../../models";
import { Response } from "express";
import { RequestCodeRequest } from "./interface";
import { isProd } from "../../../../utils/secrets";

/**
 * Route for requesting reset paassword code
 */

/**
 * responds with PublicUser
 *
 * @verb POST
 * @endpoint /api/auth/request_reset_password_code
 * @version v1
 * @description provided with valid email, generate new reset password verification code
 * 		and sent to user by email
 * @auth user+
 * @example
 *     POST /api/auth/authenticate \
 *     --data {
 * 				email
 * 			 }
 */
export default async (req: RequestCodeRequest, res: Response) => {
	try {
		await Users.findByEmailAndRequestResetPasswordCode(req.body.email);
		// direct flow to catch so route always responds the same for security
		throw new Error();
	} catch (error) {
		res.status(204).send();
	}
};
