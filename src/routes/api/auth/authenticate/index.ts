import { Users, AuthTokens } from "../../../../models";
import { Response } from "express";
import { RegisterRequest } from "./interface";
import { isProd } from "../../../../utils/secrets";
/**
 * Route for sign up
 */
export default async (req: RegisterRequest, res: Response) => {
	try {
		const { email, password } = req.body;
		const { user, token } = await Users.findByCreds(email, password);

		res.cookie("token", token, {
			expires: AuthTokens.getExpiry(),
			httpOnly: true,
			sameSite: "none",
			secure: isProd,
		})
			.status(200)
			.send(user);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: "Authentication failed" });
	}
};
