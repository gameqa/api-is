import { Users, AuthTokens } from "../../../../models";
import { Response } from "express";
import { RegisterRequest } from "./interface";
import { isProd } from "../../../../utils/secrets";

/**
 * @verb POST
 * @endpoint /api/auth/register
 * @version v1
 * @description provided an email, password, password2 and username,
 *     will register user and respond with PublicUser.
 *
 *     Password1 and password2 must match while email
 *     and username must be unique.
 * @auth none
 * @example
 *     POST /api/auth/authenticate \
 *     --data {
 * 			username:  "apidocsuser"
 * 			password:  "$ecure.pw123!"
 * 			password2: "$ecure.pw123!",
 * 			email:     "docs@spurningar.is"
 * 		}
 */
export default async (req: RegisterRequest, res: Response) => {
	try {
		// register the user
		const user = await Users.register(req.body);

		// generate auth token
		const token = await AuthTokens.generate(user._id);

		res // set token in cookie on front end
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
