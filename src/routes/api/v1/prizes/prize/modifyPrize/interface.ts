import { Request } from "express";
export interface ModifyPrizeRequest extends Request {
	body: {
		name?: string;
		brandImg?: string;
		img?: string;
		available?: boolean;
	};
}
