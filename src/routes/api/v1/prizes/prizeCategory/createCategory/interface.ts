import { Request } from "express";
import { PrizesInterface } from "../../../../../../models";
import { Types } from "mongoose";
export interface CreateCategoryRequest extends Request {
	body: {
		name: string;
		lockedImg: string;
		unlockedImg: string;
		requiredLVL: number;
		prizes: string[];
	};
}
