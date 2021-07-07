import { Request } from "express";
import { AnswersInterface, UserInterface } from "../../../../../models";

export interface GetByIdRequest extends Request {
	body: {
		user: UserInterface;
		answer: AnswersInterface;
	};
}
