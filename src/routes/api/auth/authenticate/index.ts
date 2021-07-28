import { Users, AuthTokens } from "../../../../models";
import { Response } from "express";
import { RegisterRequest } from "./interface";
import { isProd } from "../../../../utils/secrets";

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
 * 			email,
 * 			password
 * 			}
 */
export default async (req: RegisterRequest, res: Response) => {
	try {
		const { email, password } = req.body;
		const { user, token } = await Users.findByCreds(email, password);

		res
			.cookie("token", token, {
				expires: AuthTokens.getExpiry(),
				httpOnly: true,
				sameSite: "none",
				secure: isProd,
			})
			.status(200)
			.send(user);
	} catch (error) {
		res.status(400).send({ message: "Innskráning gekk ekki" });
	}
};
