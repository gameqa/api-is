import { Request } from "express";

export interface RequestCodeRequest extends Request {
	body: {
		email: string;
	};
}
