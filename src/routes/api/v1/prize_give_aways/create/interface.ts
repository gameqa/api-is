import { Request } from "express";

export interface CreateGiveAwayRequest extends Request {
	body: {
		date: string;
	};
}
