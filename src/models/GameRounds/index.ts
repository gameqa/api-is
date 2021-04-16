import { model, Schema, Types } from "mongoose";
import {
	GameRoundsInterface,
	GameRoundsCollectionInterface,
} from "./interface";
import * as utils from "./utils";
import { Users } from "../";
import * as statics from "./statics";
import * as methods from "./methods";

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
		default: undefined,
	},
	userId: {
		type: Types.ObjectId,
		required: true,
	},
});

gameRoundsSchema.statics = statics;
gameRoundsSchema.methods = methods;

gameRoundsSchema.pre<GameRoundsInterface>("save", async function (next) {
	const user = await Users.findById(this.userId);
	const userLevel = user.level ?? 1;
	if (this.isNew) {
		this.currentRound = 1;
		this.totalRounds = utils.getRoundsForUserLevel(userLevel);
	}
	if (this.currentRound > this.totalRounds)
		throw new Error(
			"Current round can not be greater then totalrounds"
		);
	if (!user) throw new Error(`No user with the id ${this.userId}`);
	next();
});

export const GameRounds = model<
	GameRoundsInterface,
	GameRoundsCollectionInterface
>("gamerounds", gameRoundsSchema, "gameRounds");

export * from "./interface";
