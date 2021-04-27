import { Request } from "express";

export interface RegisterRequest extends Request {
	body: {
		username: string;
		password: string;
		password2: string;
		email: string;
	};
}
