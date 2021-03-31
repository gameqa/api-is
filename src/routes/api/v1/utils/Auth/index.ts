import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie";
import { AuthTokens } from "../../../../../models";

export const auth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = verifyToken(req);
		const user = await AuthTokens.getUserByTokenString(token);
		req.body.user = await user;
		next();
	} catch (e) {
		res.status(401).send({
			message: e.message,
		});
	}
};

export const deleteJWT = async (req: Request, res: Response) => {
	try {
		const token = verifyToken(req);
		const found = await AuthTokens.findOneAndDelete({
			tokenString: token,
		});
		if (!found) throw new Error("Token not found");
		res.clearCookie("token");
		res.send({
			message: "Log out was successful",
		});
	} catch (e) {
		res.clearCookie("token");
		res.status(401).send({
			message: e.message,
		});
	}
};

const verifyToken = (req: Request) => {
	const { cookie } = req.headers;
	if (!cookie) throw new Error("No token present in headers");
	if (!cookie.includes("token="))
		throw new Error("Incorrect cookie present");
	const cookieObject = cookieParser.parse(cookie);
	if (!cookieObject.token) throw new Error("Token invalid");
	return cookieObject.token as string;
};
