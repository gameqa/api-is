import { Response, NextFunction } from "express";
import { UserTypes } from "../../../../../models";
import { RequestUserTypeRequest } from "./interface";

export const allowOnly = (types: UserTypes[]) => async (
	req: RequestUserTypeRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!types.includes(req.body.user.type as UserTypes))
			throw new Error(
				"You do not have the authorization to access this resource"
			);
		next();
	} catch (e) {
		res.status(401).send({
			message: e.message,
		});
	}
};
