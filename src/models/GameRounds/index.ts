import { model, Schema } from "mongoose";
import {
	GameRoundsInterface,
	GameRoundsCollectionInterface,
} from "./interface";

const gameRoundsSchema = new Schema({
	currentRound: {
		type: Number,
		default: 0,
	},
});

gameRoundsSchema.pre<GameRoundsInterface>("save", async function (next) {
	if (this.isNew) this.currentRound = 0;
	next();
});

export const GameRounds = model<
	GameRoundsInterface,
	GameRoundsCollectionInterface
>("gamerounds", gameRoundsSchema, "gameRounds");

export * from "./interface";
