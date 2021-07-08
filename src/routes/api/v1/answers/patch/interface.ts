import { Request } from "express";
import { AnswersInterface, UserInterface } from "../../../../../models";

export interface PatchByIdRequest extends Request {
	body: {
		user: UserInterface;
		answer: AnswersInterface;
	};
}
