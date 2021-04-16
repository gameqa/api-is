import { PublicUser, UserInterface } from "./interface";
import bcrypt from "bcrypt";
import {
	generateVerificationCode,
	VERIFICATION_CODE_LENGTH,
} from "./utils";
import crypto from "crypto";

export const hashString = async function (
	this: UserInterface,
	text: string
) {
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
	};
};
