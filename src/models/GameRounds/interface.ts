import { Document, Model, Types } from "mongoose";

export interface GameRoundsInterface extends Document {
	userId: Types.ObjectId;
	currentRound: number;
	totalRounds: number;
	completedAt: Date;
}

export interface GameRoundsCollectionInterface
	extends Model<GameRoundsInterface> {}
