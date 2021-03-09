import { Model, Document, Types } from "mongoose";

export interface TopicInterface extends Document {
	title: string;
	text: string;
	submittedBy: Types.ObjectId;
}

export interface TopicCollectionInterface extends Model<TopicInterface> {}
