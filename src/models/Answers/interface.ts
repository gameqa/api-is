import { Document, Model, Types } from "mongoose";
import { UserInterface } from "../Users";

export interface AnswerInterface extends Document {
	firstWord: number;
	lastWord: number;
	submittedBy: Types.ObjectId;
	questionId: Types.ObjectId;
}

export interface AnswerCollectionInterface extends Model<AnswerInterface> {}
