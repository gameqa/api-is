import { Request } from "express";
import { UserInterface } from "../../../../../models";

export interface HiscorePlacementRequest extends Request {
	body: {
		user: UserInterface;
	};
}
