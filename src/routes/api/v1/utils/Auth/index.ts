import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie";
import { AuthTokens } from "../../../../../models";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { cookie } = req.headers;
		if (!cookie) throw new Error("No token present in headers");
		if (!cookie.includes("token="))
			throw new Error("Incorrect cookie present");
		const cookieObject = cookieParser.parse(cookie);
		if (!cookieObject.token) throw new Error("Token invalid");
		const user = await AuthTokens.getUserByTokenString(cookieObject.token);
		req.body.user = await user.getPublic();
		next();
	} catch (e) {
		res.status(401).send({
			message: e.message,
		});
	}
};
