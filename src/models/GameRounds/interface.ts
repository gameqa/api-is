import { Document, Model, Types } from "mongoose";

export enum TaskTypes {
	askQuestion,
}

export interface GameRoundWithTask {
	_id: string | Types.ObjectId;
	currentRound: number;
	totalRounds: number;
	taskInfo: Tasks;
}

interface AskQuestionTask {
	ideaWords: string[];
	type: TaskTypes.askQuestion;
	deadline: Date;
}

type Tasks = AskQuestionTask;

export interface GameRoundsInterface extends Document {
	userId: Types.ObjectId;
	currentRound: number;
	totalRounds: number;
	completedAt?: Date;
}

export interface GameRoundsCollectionInterface
	extends Model<GameRoundsInterface> {
	findByUserId: (
		userId: Types.ObjectId | string
	) => Promise<GameRoundWithTask>;
}
