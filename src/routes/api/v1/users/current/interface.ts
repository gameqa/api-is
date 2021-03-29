import { Request } from "express";
import { UserInterface } from "../../../../../models";

export interface CurrentUserRequest extends Request {
	body: {
		user: UserInterface;
	};
}
