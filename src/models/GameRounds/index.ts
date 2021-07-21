import { model, Schema, Types } from "mongoose";
import {
	GameRoundsInterface,
	GameRoundsCollectionInterface,
} from "./interface";
import * as utils from "./utils";
import { Users } from "../";
import * as statics from "./statics";
import * as methods from "./methods";

/**
 * @class GameRounds
 * @mixes {GameRounds.statics}
 */
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

/**@mixin */
gameRoundsSchema.statics = statics;
gameRoundsSchema.methods = methods;

/**
 * PRE SAVE HOOK for GameRounds model
 */
gameRoundsSchema.pre<GameRoundsInterface>("save", async function (next) {
	// get the users _id from the instance being saved
	const user = await Users.findById(this.userId);

	// if no user found by the userId we throw error and do not save
	if (!user) throw new Error(`No user with the id ${this.userId}`);

	// get the user level (DEFAULT VALUE := 1 if undefined)
	const userLevel = user.level ?? 1;

	// execute the following block only on first save / create
	if (this.isNew) {
		// set current round as 1
		this.currentRound = 1;
		// utils function calculates total rounds for game round based on user level
		this.totalRounds = utils.getRoundsForUserLevel(userLevel);
		this.completedAt = undefined;
	}

	// do not save game rounds where current round exceeds total round
	if (this.currentRound > this.totalRounds)
		throw new Error("Current round can not be greater then totalrounds");

	// call next hook
	next();
});

/**
 * GameRounds is a collection that keeps tracks of
 * rounds during users playtime in the app. A pivotal
 * feature of this model is the fact that only one
 * game round can be active per user, that means that
 * the active game round saves the users progress in
 * the app.
 *
 *
 * @param {Types.ObjectId} userId the user that owns the game round
 *
 * @param {number} totalRounds CALCULATED BY MODEL, this value can not and
 *     should not be passed into the model. This is he total number of rounds to
 *     complete in this game round. Completing 'totalRounds' many rounds
 *     results in a user LVL-up.
 *
 * @param {number} currentRound CALCULATED BY MODEL, this value can not and
 *     should not be passed into the constructor. This is the current round
 *     of the user. Having currentRound < totalRounds signals that this game
 *     round is active (not completed). Is set to 1 as default
 *
 * @param {Date | undefined} completedAt CALCULATED BY MODEL, this value can
 *     not and should not be passed into the constructor. This is undefined
 *     for any inactive gameround but will be set to 'Date.now()' when the last
 *     round is completed.
 *
 */
export const GameRounds = model<
	GameRoundsInterface,
	GameRoundsCollectionInterface
>("gamerounds", gameRoundsSchema, "gameRounds");

export * from "./interface";
export * as AskAboutImage from "./AskByImage";
