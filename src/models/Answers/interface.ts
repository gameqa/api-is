import { Document, Model, Types } from "mongoose";
import { Type } from "typescript";

export interface AnswersInterface extends Document {
	articleId: Types.ObjectId;
	questionId: Types.ObjectId;
	paragraphIndex: number;
	firstWord?: number;
	lastWord?: number;
	creationRoundId: Types.ObjectId;
	answerRoundId?: Types.ObjectId;
	verificationRoundIds: Types.ObjectId[];
	verifiedAt?: Date;
	answeredAt?: Date;
}

export interface AnswersCollectionInterface
	extends Model<AnswersInterface> {}
