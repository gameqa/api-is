import { Document, Model, Types } from "mongoose";

export interface QuestionsInterface extends Document {
	text: string;
	creationRoundId: Types.ObjectId;
	verifycationRoundIds: Types.ObjectId[];
	verifiedAt: Date;
	verify: (user: Types.ObjectId) => Promise<void>;
}

export interface QuestionsCollectionInterface
	extends Model<QuestionsInterface> {}
