import { Request } from "express";
import { UserInterface } from "../../../../../models";

/**
 * Interface for read all prize giveaways 
 * route
 */
export interface ReadAllRequest extends Request {
	body: {
		user: UserInterface;
	};
}
