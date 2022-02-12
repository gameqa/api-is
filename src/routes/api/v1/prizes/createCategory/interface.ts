import { Request } from "express";

export interface CreateCategoryRequest extends Request {
	body: {
		name: string;
		lockedImg: string;
		unlockedImg: string;
		requiredLVL: number;
		prizes?: string[];
	};
}
