import { Request } from "express";
export interface CreatePrizeRequest extends Request {
	body: {
		name: string;
		brandImg: string;
		img: string;
		available?: boolean;
	};
}
