import { Request } from "express";

export interface RegisterRequest extends Request {
	body: {
		password: string;
		email: string;
	};
}
