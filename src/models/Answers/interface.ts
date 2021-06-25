import { Document, Model, Types } from "mongoose";

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
	archived: boolean;
	isDisqualified: boolean;
	// flags
	canBeShortened: boolean;
	yesOrNoAnswer?: boolean;
	// methods
	verify: (
		userId: Types.ObjectId,
		canBeShortened?: boolean
	) => Promise<void>;
	setYesOrNoAnswer: (answer: boolean) => Promise<void>;
}

export interface SpanAnswer {
	roundId: Types.ObjectId;
	firstWord: number;
	lastWord: number;
}

export interface AnswersCollectionInterface
	extends Model<AnswersInterface> {
	findByIdAndSetSpan: (
		id: string | Types.ObjectId,
		answer: SpanAnswer
	) => Promise<AnswersInterface | null>;
	findByIdAndArchive: (
		id: string | Types.ObjectId
	) => Promise<AnswersInterface | null>;
}
