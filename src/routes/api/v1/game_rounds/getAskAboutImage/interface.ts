import { Request } from "express";
import { UserInterface } from "../../../../../models";

export interface GetAskAboutImageRequest extends Request {
	body: {
		user: UserInterface;
	};
}
