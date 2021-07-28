import { Users } from "../../../../models";
import { Response } from "express";
import { RequestCodeRequest } from "./interface";

/**
 * @verb POST
 * @endpoint /api/auth/request_reset_password_code
 * @version v1
 * @description provided with valid email, generate new code
 *     that is sent to users email so he can proceed with
 *     resetting his password
 * @example
 *     POST /api/auth/authenticate \
 *     --data {
 * 				email: "docs@spurningar.is"
 * 		}
 */
export default async (req: RequestCodeRequest, res: Response) => {
	/**
	 * STEP 1 OF RESETTING PASSWORD:
	 * A user whishing to reset his password calls this
	 * endpoint to request a code sent through email
	 *
	 * NOTE:
	 * This route should always respond 204 (No Content) as
	 * it should not notify the front end on whether or not
	 * sending the code was successful.
	 *
	 * Thus, wether the operation fails or not, we will always
	 * end the try block by throwing an error in order to direct
	 * the flow (no matter what) to the catch block where we
	 * send the 204 status code
	 */
	try {
		// request code that will be sent  via email
		await Users.findByEmailAndRequestResetPasswordCode(req.body.email);
		// direct flow
		throw new Error();
	} catch (error) {
		// respond with No Content
		res.status(204).send();
	}
};
