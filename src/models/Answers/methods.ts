import { Types } from "mongoose";
import { AnswersInterface } from "./interface";
import { Users, Questions, Answers } from "..";
import { VERIFICATION_COUNTS } from "./utils";

export const verify = async function (
	this: AnswersInterface,
	userId: Types.ObjectId,
	canBeShortened?: boolean
) {
	const user = await Users.findById(userId);
	if (!user) throw new Error("Verification must come from a userId");

	await this.update({
		$push: { verificationRoundIds: userId },
		$set: {
			canBeShortened:
				(canBeShortened ?? false) || this.canBeShortened,
			// spread out object with  verifiedAt if we want to verify
			...(this.verificationRoundIds.length + 1 ===
			VERIFICATION_COUNTS
				? { verifiedAt: new Date() }
				: {}),
		},
	});
};

export const setYesOrNoAnswer = async function (
	this: AnswersInterface,
	answer: boolean
) {
	const { questionId } = this;
	const question = await Questions.findById(this.questionId);
	if (!question)
		throw new Error(
			`Trying to set yes or no answer but question ${questionId} not found`
		);
	if (!question.isYesOrNo)
		throw new Error(
			`Can not set yes or no answer in Answer that belongs to a question that is not yes or no`
		);
	if (
		this.yesOrNoAnswer !== undefined &&
		this.yesOrNoAnswer !== answer
	) {
		/**
		 * This is a case when two reveiwers disagree, then the answer
		 * should be archived
		 */
		await Answers.findByIdAndArchive(this._id);
		throw new Error(
			"Changin yes or no asnwer indiciates that paragraph does not contain question"
		);
	}

	await this.update({ $set: { yesOrNoAnswer: answer } });
};
