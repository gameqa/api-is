import { Users, AuthTokens } from "../../../../models";
import { Response } from "express";
import { RequestCodeRequest } from "./interface";
import { isProd } from "../../../../utils/secrets";

/**
 * Route for requesting reset paassword code
 */
export default async (req: RequestCodeRequest, res: Response) => {
	try {
		await Users.findByEmailAndRequestResetPasswordCode(req.body.email);
		// direct flow to catch so route always responds the same for security
		throw new Error();
	} catch (error) {
		res.status(204).send();
	}
};
