import { Request } from "express";
import { UserInterface } from "../../../../../models";
export interface RequestUserTypeRequest extends Request {
	body: {
		user: UserInterface;
	};
}
