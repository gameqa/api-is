import { Request } from "express";
import { PrizesInterface } from "../../../../../../models";
export interface ModifyPrizeCategoryRequest extends Request {
	body: {
		name: string;
		lockedImg: string;
		unlockedImg: string;
		requiredLVL: number;
		prizes: PrizesInterface[];
	};
}
