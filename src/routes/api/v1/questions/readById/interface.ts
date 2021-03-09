import { Request } from "express";
import { UserInterface, ParagraphInterface } from "../../../../../models";

export interface ReadQuestionByIdRequest extends Request {
	user: UserInterface;
	paragraph: ParagraphInterface;
}
