import { Document, Model, Types } from "mongoose";
import { ArchiveReason, UserInterface } from "../";

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

export interface ImageInfo {
	url: string;
	subject_tf: string;
}

// ask question interfaces
interface AskQuestionTask {
	ideaWords: string[];
	image: ImageInfo;
	type: "make-question";
	questionType: string;
}
interface AskQuestionUserPayload {
	type: "make-question";
	text: string;
	isYesOrNo: boolean;
}

// verify question interfaces
interface VerifyQuestionTask {
	_id: Types.ObjectId;
	text: string;
	type: "verify-question";
	isYesOrNo: boolean;
}
interface VerifyQuestionUserPayload {
	type: "verify-question";
	archive: boolean;
	archiveReason?: ArchiveReason;
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
	isYesOrNo: boolean;
}
interface VerifySpanUserPayload {
	_id: Types.ObjectId;
	type: "verify-span";
	canBeShortened?: boolean;
}
interface VerifyYesNoAnswerParagraphUserPayload {
	type: "verify-yes-no-answer-paragraph";
	answerId: string | Types.ObjectId;
	answer: boolean;
}

// Set yes or no question payload
interface SetIsYesOrNoFlagUserPayload {
	answerId: string | Types.ObjectId;
	type: "set-yes-or-no-flag";
	isYesOrNo: boolean;
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
	| MarkQuestionAsImpossible
	| VerifyYesNoAnswerParagraphUserPayload
	| SetIsYesOrNoFlagUserPayload
	| { type: "bad-type" };

export interface GameRoundsInterface extends Document {
	userId: Types.ObjectId;
	currentRound: number;
	totalRounds: number;
	completedAt?: Date;
	advance: (
		payload: AskQuestionUserPayload,
		user: UserInterface
	) => Promise<GameRoundWithTask>;
}

export interface GameRoundsCollectionInterface
	extends Model<GameRoundsInterface> {
	findByUserId: (userId: Types.ObjectId | string) => Promise<GameRoundWithTask>;
}
