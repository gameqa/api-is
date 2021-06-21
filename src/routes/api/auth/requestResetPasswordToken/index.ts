import { Users } from "../../../../models";
import { Response } from "express";
import { RequestTokenRequest } from "./interface";

/**
 * Route for requesting reset paassword code
 */
export default async (req: RequestTokenRequest, res: Response) => {
	try {
		const token = await Users.findByEmailAndRequestResetPasswordToken(
			req.body.email,
			req.body.code
		);
		res.send({ token });
	} catch (error) {
		res.status(400).send({
			message: "Invalid code",
		});
	}
};
