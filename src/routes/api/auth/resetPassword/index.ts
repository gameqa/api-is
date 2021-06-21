import { Users } from "../../../../models";
import { Response } from "express";
import { RequestTokenRequest } from "./interface";

/**
 * Route for requesting reset paassword code
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
		res.send(user.getPublic());
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
};
