import { Request } from "express";
import { UserInterface, TopicInterface } from "../../../../../models";

export interface ReadTopicByIdRequest extends Request {
	user: UserInterface;
	topic: TopicInterface;
}
