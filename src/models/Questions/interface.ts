import { Document, Model, Types } from "mongoose";

export interface QuestionsInterface extends Document {
	text: string;
	creationRoundId: Types.ObjectId;
	verifycationRoundIds: Types.ObjectId[];
	verifiedAt: Date;
	archived: boolean;
	verify: (user: Types.ObjectId) => Promise<void>;
	answeredAt?: Date;
	markAsAnswered: () => Promise<void>;
	markAsUnAnswered: () => Promise<void>;
}

export interface QuestionsCollectionInterface
	extends Model<QuestionsInterface> {
	findByIdAndArchive: (
		id: string | Types.ObjectId
	) => Promise<void | QuestionsInterface>;
}
