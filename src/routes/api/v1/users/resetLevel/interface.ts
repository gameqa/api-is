import { Request } from "express";
import { UserInterface } from "../../../../../models";

export interface ResetLevelRequest extends Request {
	body: {
		user: UserInterface;
	};
}
