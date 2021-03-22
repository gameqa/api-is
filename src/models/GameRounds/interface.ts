import { Document, Model, Types } from "mongoose";

export type TaskTypes =
	| "make-question"
	| "verify-question"
	| "find-article";

export interface GameRoundWithTask {
	_id: string | Types.ObjectId;
	currentRound: number;
	totalRounds: number;
	taskInfo: TaskInfo;
}

interface AskQuestionTask {
	ideaWords: string[];
	type: "make-question";
}

interface VerifyQuestionTask {
	_id: Types.ObjectId;
	text: string;
	type: "verify-question";
}

interface FindArticleTask {
	_id: Types.ObjectId;
	text: string;
	type: "find-article";
}

export type TaskInfo =
	| AskQuestionTask
	| VerifyQuestionTask
	| FindArticleTask;

export interface GameRoundsInterface extends Document {
	userId: Types.ObjectId;
	currentRound: number;
	totalRounds: number;
	completedAt?: Date;
	advance: () => Promise<void>;
}

export interface GameRoundsCollectionInterface
	extends Model<GameRoundsInterface> {
	findByUserId: (
		userId: Types.ObjectId | string
	) => Promise<GameRoundWithTask>;
}
