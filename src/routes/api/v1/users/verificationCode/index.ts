import { Users } from "../../../../../models";
import { VerificationCodeRequest } from "./interface";
import { Response } from "express";

/**
 * responds with PublicUser
 *
 * @verb POST
 * @endpoint /api/v1/users/verification_code
 * @version v1
 * @description provided a valid verification code the route will verify the user.
 *     This changes the user-type to "user" from "not-verified"
 *     The route will respond with a public view of the current user.
 * @auth user+
 * @example
 *     POST /api/v1/users/verification_code \
 *     --data {
 *   		code: "123456"
 * 		}
 */
export default async (req: VerificationCodeRequest, res: Response) => {
	const { user, verificationCode } = req.body;
	try {
		await user.verify(verificationCode ?? "");
		const doc = await Users.findById(user._id);
		res.send(doc.getPublic());
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
};
