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
	questionType: string;
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
interface VerifyQuestionUserPayload {
	type: "verify-question";
	archive: boolean;
	questionId: string | Types.ObjectId;
}

// find article interfaces
interface FindArticleTask {
	_id: Types.ObjectId;
	text: string;
	type: "find-article";
}

interface FindArticleUserPayload {
	type: "find-article";
	key: string;
	identifier: string;
	paragraphIndex: number;
	questionId: string;
}
interface MarkQuestionAsImpossible {
	type: "mark-question-impossible";
	questionId: string;
}

// locate span task interfaces
interface LocateSpanTask {
	_id: Types.ObjectId;
	text: string;
	type: "locate-span";
	paragraph: string;
}
interface LocateSpanUserPayload {
	type: "locate-span";
	answerId: string;
	firstWord: number;
	lastWord: number;
}

interface ArchiveAnswerUserPayload {
	type: "archive-answer";
	answerId: string;
}

// verify span interfaces
interface VerifySpanTask {
	_id: Types.ObjectId;
	text: string;
	type: "verify-span";
	paragraph: string;
	firstWord: number;
	lastWord: number;
}
interface VerifySpanUserPayload {
	_id: Types.ObjectId;
	type: "verify-span";
	canBeShortened?: boolean;
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
	| CompletedGameRound
	| VerifySpanTask;

export type TaskUserPayload =
	| AskQuestionUserPayload
	| VerifyQuestionUserPayload
	| FindArticleUserPayload
	| ArchiveAnswerUserPayload
	| LocateSpanUserPayload
	| VerifySpanUserPayload
	| { type: "bad-type" };

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
