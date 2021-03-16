import { Document, Model, Types } from "mongoose";

export interface QuestionsInterface extends Document {
	text: string;
	creationRoundId: Types.ObjectId;
	verifycationRoundIds: Types.ObjectId[];
	verifiedAt: Date;
}

export interface QuestionsCollectionInterface
	extends Model<QuestionsInterface> {}
