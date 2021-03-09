import { Document, Model, Types } from "mongoose";

export interface ParagraphInterface extends Document {
	context: string;
	topicId: Types.ObjectId;
	submittedBy: Types.ObjectId;
}

export interface ParagraphCollectionInterface
	extends Model<ParagraphInterface> {}
