import { Request } from "express";
import { UserInterface, ParagraphInterface } from "../../../../../models";

export interface ReadParagraphByIdRequest extends Request {
	user: UserInterface;
	paragraph: ParagraphInterface;
}
