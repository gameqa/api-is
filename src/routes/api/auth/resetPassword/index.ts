import { Users, AuthTokens } from "../../../../models";
import { Response } from "express";
import { RequestTokenRequest } from "./interface";
import { isProd } from "../../../../utils/secrets";

/**
 * responds with PublicUser
 *
 * @verb POST
 * @endpoint /api/auth/reset_password
 * @version v1
 * @description provided with valid email, password and token, updates users new password,
 * 		 sets cookies and returns public view of the user
 * @auth user+
 * @example
 *     POST /api/auth/reset_password \
 *     --data {
 * 				email,
 * 				password,
 * 				token
 * 			 }
 */
export default async (req: RequestTokenRequest, res: Response) => {
	const { email, password, token } = req.body;
	try {
		if (!(email && password && token))
			throw new Error(
				"Route must give parameters 'email', 'password', and 'token'"
			);
		const user = await Users.findByEmailAndResetPassword(
			email,
			token,
			password
		);
		const authToken = await AuthTokens.generate(user._id);
		res
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
