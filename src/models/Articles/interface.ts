import { Document, Model, Types } from "mongoose";

export interface ArticlesInterface extends Document {
	title: string;
	extract: string;
	key: string;
	paragraphs: string[];
	sourceId: Types.ObjectId;
}

export interface ArticlesCollectionInterface extends Model<ArticlesInterface> {}
