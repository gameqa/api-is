import { Request } from "express";

export interface ReadQueryRequest extends Request {
	query: {
		query?: string;
	};
}
