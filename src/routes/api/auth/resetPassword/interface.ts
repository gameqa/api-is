import { Request } from "express";

export interface ResetPasswordRequest extends Request {
	body: {
		email: string;
		token: string;
		password: string;
	};
}
