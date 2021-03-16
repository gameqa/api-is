import { Users, AuthTokens } from "../../../../models";
import { Response } from "express";
import { RegisterRequest } from "./interface";
import { isProd } from "../../../../utils/secrets";

/**
 * Route for sign up
 */
export default async (req: RegisterRequest, res: Response) => {
	try {
		const user = await Users.register(req.body);
		const token = await AuthTokens.generate(user._id);
		res.cookie("token", token, {
			expires: AuthTokens.getExpiry(),
			httpOnly: true,
			sameSite: "none",
			secure: isProd,
		})
			.status(201)
			.send(user.getPublic());
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: "Nýskráning gekk ekki" });
	}
};
