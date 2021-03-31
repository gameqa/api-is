import { PublicUser, UserInterface } from "./interface";
import bcrypt from "bcrypt";
import {
	generateVerificationCode,
	VERIFICATION_CODE_LENGTH,
} from "./utils";

export const hashString = async function (
	this: UserInterface,
	text: string
) {
	return await bcrypt.hash(text, 8);
};

export const setVerificationCode = async function (this: UserInterface) {
	const code = generateVerificationCode(VERIFICATION_CODE_LENGTH);
	this.verificationCode = code;
	await this.save();
	return code;
};

export const getPublic = function (this: UserInterface): PublicUser {
	return {
		username: this.username,
		email: this.email,
		type: this.type,
		_id: this._id,
		scoreCard: {
			questions: this.questionCount ?? 0,
			answers: this.answerCount ?? 0,
			answerVerifications: this.verifyAnswerCount ?? 0,
			questionVerifications: this.verifyQuestionCount ?? 0,
			articles: this.articlesFoundCount ?? 0,
		},
	};
};
