import { PublicUser, UserInterface } from "./interface";
import bcrypt from "bcrypt";
import { generateVerificationCode, VERIFICATION_CODE_LENGTH } from "./utils";
import crypto from "crypto";
import { Users, GameRounds } from "../";
import motivation from "./motivation";

export const hashString = async function (this: UserInterface, text: string) {
	return await bcrypt.hash(text, 8);
};

export const sha256 = function (this: UserInterface, text: string) {
	const hash = crypto.createHash("sha256").update(text).digest("base64");
	return hash.toString();
};

export const setVerificationCode = async function (this: UserInterface) {
	if (this.type !== "not-verified")
		throw new Error(
			"Ekki hægt að búa til staðfestingarkóða fyrir notanda sem hefur núþegar staðfest"
		);
	const code = generateVerificationCode(VERIFICATION_CODE_LENGTH);
	this.verificationCode = code;
	await this.save();
	return code;
};

export const verify = async function (this: UserInterface, code: string) {
	const hashed = await this.sha256(code);
	if (this.type !== "not-verified")
		throw new Error("Þú ert núþegar búin/n að staðfesta aðganginn");
	if (code.length !== VERIFICATION_CODE_LENGTH)
		throw new Error(
			`Staðfestingarkóði verður að vera ${VERIFICATION_CODE_LENGTH} tölur`
		);
	if (this.verificationCode !== hashed)
		throw new Error("Rangur staðfestingarkóði");
	this.type = "user";

	if (this.invitedBy) {
		await Users.findByIdAndUpdate(this.invitedBy, {
			$inc: { invites: 1 },
		});
	}
	await this.save();
};

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

export const completeTutorial = async function (this: UserInterface) {
	this.hasCompletedTutorial = true;
	await this.save();
};

export const getMovitation = function (this: UserInterface) {
	return motivation(this);
};
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
