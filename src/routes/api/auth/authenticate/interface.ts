import { Request } from "express";

export interface AuthenticateRequest extends Request {
	body: {
		password: string;
		email: string;
	};
}
