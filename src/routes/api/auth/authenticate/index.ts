import { Users, AuthTokens } from "../../../../models";
import { Response } from "express";
import { AuthenticateRequest } from "./interface";
import { isProd } from "../../../../utils/secrets";

/**
 * responds with PublicUser if authentication
 * information is valid
 *
 * @verb POST
 * @endpoint /api/auth/authenticate
 * @version v1
 * @description provided a email and password the route will return a public view
 *     of the user
 * @example
 *     POST /api/auth/authenticate \
 *     --data {
 *          email: "test@spurningar.is"
 * 			password: "some.$ecur3.Pw"
 * 	   }
 */
export default async (req: AuthenticateRequest, res: Response) => {
	try {
		// destructure information from body
		const { email, password } = req.body;

		// find the user
		const { user, token } = await Users.findByCreds(email, password);

		res // set cookie on front end
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
