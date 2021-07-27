import { Document, Model, Types } from "mongoose";
import { AnswersInterface } from "../Answers";

export type ArchiveReason =
	| "long-answer"
	| "unintelligible"
	| "variable-answer";

export interface QuestionsInterface extends Document {
	text: string;
	creationRoundId: Types.ObjectId;
	createdBy?: Types.ObjectId;
	verifycationRoundIds: Types.ObjectId[];
	verifiedAt?: Date;
	archived: boolean;
	archiveReason?: ArchiveReason;
	answeredAt?: Date;
	isImpossible: boolean;
	isYesOrNo?: boolean;
	isDisqualified: boolean;
	verify: (user: Types.ObjectId) => Promise<void>;
	markAsAnswered: () => Promise<void>;
	markAsUnAnswered: () => Promise<void>;
}

export interface QuestionsCollectionInterface
	extends Model<QuestionsInterface> {
	findByIdAndArchive: (
		id: string | Types.ObjectId
	) => Promise<void | QuestionsInterface>;
	getQuestionWord: () => string;
	findByIdAndMarkAsImpossible: (
		id: string | Types.ObjectId
	) => Promise<void | QuestionsInterface>;
	findByUserIdAndPopulateAnswers: (
		id: Types.ObjectId
	) => Promise<void | QuestionsInterface>;
}

export interface QuestionsWithAnswers extends QuestionsInterface {
	answers: AnswersInterface[];
}
