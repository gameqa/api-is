import { Request } from "express";
import { UserInterface, AnswerInterface } from "../../../../../models";

export interface ReadAnswerByIdRequest extends Request {
	user: UserInterface;
	answer: AnswerInterface;
}
