import { Request } from "express";
import { UserInterface } from "../../../../../models";

export interface CreateTopicRequest extends Request {
	user: UserInterface;
}
