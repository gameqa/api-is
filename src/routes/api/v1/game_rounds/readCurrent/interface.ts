import { Request } from "express";
import { UserInterface } from "../../../../../models";

export interface ReadCurrentGameRoundRequest extends Request {
	body: {
		user: UserInterface;
	};
}
