import { Users, AuthTokens } from "../../../../models";
import { Response } from "express";
import { RegisterRequest } from "./interface";
import { isProd } from "../../../../utils/secrets";

/**
 * Route for sign up
 */

/**
 * responds with PublicUser
 *
 * @verb POST
 * @endpoint /api/auth/authenticate
 * @version v1
 * @description provided a email and password the route will return a public view
 *     of the user
 * @auth user+
 * @example
 *     POST /api/auth/authenticate \
 *     --data {
 * 			username,
 * 			password,
 * 			password2,
 * 			email,
 * 			}
 */
export default async (req: RegisterRequest, res: Response) => {
	try {
		const user = await Users.register(req.body);
		const token = await AuthTokens.generate(user._id);
		res
			.cookie("token", token, {
				expires: AuthTokens.getExpiry(),
				httpOnly: true,
				sameSite: "none",
				secure: isProd,
			})
			.status(201)
			.send(user.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
