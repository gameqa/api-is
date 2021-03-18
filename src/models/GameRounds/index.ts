import { model, Schema } from "mongoose";
import {
	GameRoundsInterface,
	GameRoundsCollectionInterface,
} from "./interface";
import * as utils from "./utils";

const gameRoundsSchema = new Schema({
	currentRound: {
		type: Number,
		default: 1,
	},
	totalRounds: {
		type: Number,
		default: utils.DEFAULT_GAME_ROUNDS,
	},
	completedAt: {
		type: Date,
	},
});

gameRoundsSchema.pre<GameRoundsInterface>("save", async function (next) {
	if (this.isNew) {
		this.currentRound = 1;
		this.completedAt = undefined;
	}
	if (this.currentRound > this.totalRounds)
		throw new Error("Current round can not be greater then totalrounds");
	next();
});

export const GameRounds = model<
	GameRoundsInterface,
	GameRoundsCollectionInterface
>("gamerounds", gameRoundsSchema, "gameRounds");

export * from "./interface";
