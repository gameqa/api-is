import { Users, AuthTokens } from "../../../../models";
import { Response } from "express";
import { ResetPasswordRequest } from "./interface";
import { isProd } from "../../../../utils/secrets";

/**
 * @verb POST
 * @endpoint /api/auth/reset_password
 * @version v1
 * @description will reset password for user with
 *     given email if he possesses a valid reset
 *     password token
 * @example
 *     POST /api/auth/reset_password \
 *     --data {
 * 				email:    "docs@spurningar.is",
 * 				token:    "c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2",
 *              password: "n3w.p4$$w012d!"
 * 	   }
 */
export default async (req: ResetPasswordRequest, res: Response) => {
	const { email, password, token } = req.body;
	try {
		// verify that parameters exist
		if (!(email && password && token))
			throw new Error(
				"Route must give parameters 'email', 'password', and 'token'"
			);

		// change password
		const user = await Users.findByEmailAndResetPassword(
			email,
			token,
			password
		);

		// generate new authtoken
		const authToken = await AuthTokens.generate(user._id);

		res // set token as cookie on front end
			.cookie("token", authToken, {
				expires: AuthTokens.getExpiry(),
				httpOnly: true,
				sameSite: "none",
				secure: isProd,
			})
			.send(user.getPublic());
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
};
