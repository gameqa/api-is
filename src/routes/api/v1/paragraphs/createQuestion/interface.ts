import { Request } from "express";
import { ParagraphInterface, UserInterface } from "../../../../../models";

export interface CreateQuestionRequest extends Request {
	user: UserInterface;
	paragraph: ParagraphInterface;
}
