import { Request } from "express";

export interface RequestTokenRequest extends Request {
	body: {
		email: string;
		code: string;
	};
}
