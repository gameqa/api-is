import { Request } from "express";
import { UserInterface } from "../../../../../models";

export interface ReadAllRequest extends Request {
	body: {
		user: UserInterface;
	};
}
