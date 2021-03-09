import { Document, Model, Types } from "mongoose";

export interface QuestionInterface extends Document {
	question: string;
	paragraphId: Types.ObjectId;
	submittedBy: Types.ObjectId;
}

export interface QuestionCollectionInterface extends Model<QuestionInterface> {}
