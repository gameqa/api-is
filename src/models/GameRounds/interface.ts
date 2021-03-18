import { Document, Model, Types } from "mongoose";

type TaskTypes =
	| "ask-question"
	| "qa-question"
	| "submit-article"
	| "select-span"
	| "qa-answer-span"
	| "done";

interface TaskInfo {}

export interface GameRoundsInterface extends Document {
	userId: Types.ObjectId;
	currentRound: number;
	totalRounds: number;
	completedAt?: Date;
	getTask: () => Promise<TaskInfo>;
	completeRound: () => Promise<TaskInfo>;
}

export interface GameRoundsCollectionInterface
	extends Model<GameRoundsInterface> {
	findByUserId: (
		userId: Types.ObjectId | string
	) => Promise<GameRoundsInterface>;
}
