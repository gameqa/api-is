import { Request } from "express";
import { UserInterface } from "../../../../../models";

export interface CompleteTutorialRequest extends Request {
	body: {
		user: UserInterface;
		token: string;
	};
}
