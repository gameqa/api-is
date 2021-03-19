import { Document, Model, Types } from "mongoose";
import { Type } from "typescript";

export interface AnswersInterface extends Document {
	// required objectIds not relevant to article
	questionId: Types.ObjectId;
	creationRoundId: Types.ObjectId;
	// article info
	articleId: Types.ObjectId;
	paragraphIndex: number;
	firstWord?: number;
	lastWord?: number;
	// objectIds needed for verification
	answerRoundId?: Types.ObjectId;
	verificationRoundIds: Types.ObjectId[];
	// records
	verifiedAt?: Date;
	answeredAt?: Date;
}

export interface AnswersCollectionInterface
	extends Model<AnswersInterface> {}
