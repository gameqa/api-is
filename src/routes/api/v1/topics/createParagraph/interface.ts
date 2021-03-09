import { Request } from "express";
import { TopicInterface, UserInterface } from "../../../../../models";

export interface CreateParagraphRequest extends Request {
	user: UserInterface;
	topic: TopicInterface;
}
