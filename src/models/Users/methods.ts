import { PublicUser, UserInterface } from "./interface";
import bcrypt from "bcrypt";
import { generateVerificationCode, VERIFICATION_CODE_LENGTH } from "./utils";
import crypto from "crypto";
import { Users, GameRounds } from "../";
import motivation from "./motivation";

/**
 * This is a function that takes in a data string and hashes it
 *
 * @param this type declaration
 * @param text data string of text you want to hash
 * @returns A promise to be either resolved with the encrypted data salt or rejected with an Error
 */
export const hashString = async function (this: UserInterface, text: string) {
	return await bcrypt.hash(text, 8);
};

/**
 * This is a function that takes in a data string and hashes it
 *
 * @param this - type declaration
 * @param text - data string of text you want to hash
 * @returns hashed string
 */
export const sha256 = function (this: UserInterface, text: string) {
	const hash = crypto.createHash("sha256").update(text).digest("base64");
	return hash.toString();
};

/**
 * if usertype is not-verified
 * then generates new verification code and saves, else throws error.
 *
 * @param this type declaration
 * @returns Verification code
 */
export const setVerificationCode = async function (this: UserInterface) {
	/** If usertpye is not-verified
	 * Throw error: cannot make verification code for user that is verified
	 */
	if (this.type !== "not-verified")
		throw new Error(
			"Ekki hægt að búa til staðfestingarkóða fyrir notanda sem hefur núþegar staðfest"
		);
	// Generate new verification code
	const code = generateVerificationCode(VERIFICATION_CODE_LENGTH);
	this.verificationCode = code;
	await this.save();
	return code;
};

/**
 * if it matches the one set. If it matches, change usertype to "user" then save.
 *
 * @param this type declaration
 * @param code verification code to compare
 */
export const verify = async function (this: UserInterface, code: string) {
	const hashed = await this.sha256(code);
	/** If usertpye is not  "not-verified"
	 * Throw error: cannot make verification code for user that is verified
	 */
	if (this.type !== "not-verified")
		throw new Error("Þú ert núþegar búin/n að staðfesta aðganginn");
	/**
	 * if user inputted verification code is not of right lenght
	 * throw error: verification code must be X long
	 */
	if (code.length !== VERIFICATION_CODE_LENGTH)
		throw new Error(
			`Staðfestingarkóði verður að vera ${VERIFICATION_CODE_LENGTH} tölur`
		);
	/**
	 * If set verification code does not match the hashed of the user inputted one,
	 * throw error: Wrong verification code */
	if (this.verificationCode !== hashed)
		throw new Error("Rangur staðfestingarkóði");
	this.type = "user";

	/**
	 * @deprecated - no longer support invitedBy
	 */
	if (this.invitedBy) {
		await Users.findByIdAndUpdate(this.invitedBy, {
			$inc: { invites: 1 },
		});
	}
	await this.save();
};

/**
 * Sets the values in an object that we want the frontend to have
 *
 * @param this type declaration
 * @returns PublicUser object with the user values we want the front end to have
 */
export const getPublic = function (this: UserInterface): PublicUser {
	return {
		username: this.username,
		email: this.email,
		type: this.type,
		_id: this._id,
		level: this.level ?? 1,
		scoreCard: {
			questions: this.questionCount ?? 0,
			answers: this.answerCount ?? 0,
			answerVerifications: this.verifyAnswerCount ?? 0,
			questionVerifications: this.verifyQuestionCount ?? 0,
			articles: this.articlesFoundCount ?? 0,
			hiscoreRank: this.hiscoreRank ?? -1,
		},
		hasCompletedTutorial: this.hasCompletedTutorial ?? false,
		streak: this.dailyStreak,
		resetCount: this.resetCount ?? 0,
	};
};

/**
 * @deprecated no longer have tutorial
 * @param this type decleration
 */
export const completeTutorial = async function (this: UserInterface) {
	this.hasCompletedTutorial = true;
	await this.save();
};

/**
 * Gets motivation for this user
 *
 * @param this type declaration
 * @returns — the Motivation object
 */
export const getMovitation = function (this: UserInterface) {
	return motivation(this);
};

/**
 * returns a list of users, around the highscore rank of the current user
 *
 * @param this - type declaration
 * @returns PublicUser[]
 */
export const getHighscoreList = async function (
	this: UserInterface
): Promise<PublicUser[]> {
	const USER_COUNT_ABOVE = 5;
	const USER_COUNT_BELOW = 4;
	const userRank = this.hiscoreRank;
	const firstRank = Math.max(1, userRank - USER_COUNT_ABOVE);
	const lastRank = firstRank + USER_COUNT_ABOVE + USER_COUNT_BELOW;
	const users = await Users.find({
		hiscoreRank: { $gte: firstRank, $lte: lastRank },
	});
	return users.map((user) => user.getPublic());
};

/**
 * THe function resets the level for the user and increments resetCount by one
 * if the user has reached level 20
 *
 * This implements Prestige
 *
 * @param this - type declaration
 * @returns UserInterface
 */
export const resetLevel = async function (
	this: UserInterface
): Promise<UserInterface> {
	const gameRound = await GameRounds.findOne({
		userId: this._id,
		completedAt: { $exists: false },
	});

	// clear up any unfinished gamerounds
	if (gameRound) {
		gameRound.totalRounds = gameRound.currentRound;
		gameRound.completedAt = new Date();
		await gameRound.save();
	}

	// check level
	const MIN_LEVEL_TO_LEVEL_UP = 20;
	if (this.level < MIN_LEVEL_TO_LEVEL_UP) return this;

	// reset levels
	this.level = 1;
	this.resetCount = (this.resetCount ?? 0) + 1;

	// save and return instance
	await this.save();
	return this;
};
