import { Request } from "express";
import { QuestionInterface, UserInterface } from "../../../../../models";

export interface CreateAnswerRequest extends Request {
	user: UserInterface;
	question: QuestionInterface;
}
