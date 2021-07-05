import { Request } from "express";
import { UserInterface } from "../../../../../models";

export interface QuestionsRequest extends Request {
	body: {
		user: UserInterface;
	};
}
