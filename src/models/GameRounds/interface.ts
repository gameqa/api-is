import { Document, Model, Types } from "mongoose";

export type TaskTypes =
	| "make-question"
	| "verify-question"
	| "find-article"
	| "locate-span"
	| "completed";

export interface GameRoundWithTask {
	_id: string | Types.ObjectId;
	currentRound: number;
	totalRounds: number;
	taskInfo: TaskInfo;
}

// ask question interfaces
interface AskQuestionTask {
	ideaWords: string[];
	type: "make-question";
}
interface AskQuestionUserPayload {
	type: "make-question";
	text: string;
}

// verify question interfaces
interface VerifyQuestionTask {
	_id: Types.ObjectId;
	text: string;
	type: "verify-question";
}

// find article interfaces
interface FindArticleTask {
	_id: Types.ObjectId;
	text: string;
	type: "find-article";
}

// locate span task interfaces
interface LocateSpanTask {
	_id: Types.ObjectId;
	text: string;
	type: "locate-span";
	paragraph: string;
}

// completed interface
interface CompletedGameRound {
	type: "completed";
}

export type TaskInfo =
	| AskQuestionTask
	| VerifyQuestionTask
	| FindArticleTask
	| LocateSpanTask
	| CompletedGameRound;

export type TaskUserPayload = AskQuestionUserPayload;

export interface GameRoundsInterface extends Document {
	userId: Types.ObjectId;
	currentRound: number;
	totalRounds: number;
	completedAt?: Date;
	advance: (
		payload: AskQuestionUserPayload
	) => Promise<GameRoundWithTask>;
}

export interface GameRoundsCollectionInterface
	extends Model<GameRoundsInterface> {
	findByUserId: (
		userId: Types.ObjectId | string
	) => Promise<GameRoundWithTask>;
}
