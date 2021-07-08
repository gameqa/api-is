import { Types } from "mongoose";
import { AnswersInterface, PublicAnswer } from "./interface";
import { Users, Questions, Answers, Articles } from "..";
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
			canBeShortened: (canBeShortened ?? false) || this.canBeShortened,
			// spread out object with  verifiedAt if we want to verify
			...(this.verificationRoundIds.length + 1 === VERIFICATION_COUNTS
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
	if (this.yesOrNoAnswer !== undefined && this.yesOrNoAnswer !== answer) {
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

export const toPublic = async function (
	this: AnswersInterface
): Promise<PublicAnswer> {
	const question = await Questions.findById(this.questionId);
	if (!question) throw new Error("Answer does not have valid question ID");

	const createdBy =
		await Users.findById(this.createdBy);
	const createdByPublic = createdBy ? createdBy.getPublic() : undefined;

	if (question.isYesOrNo) {
		return {
			type: "yes-no",
			answerIs: this.yesOrNoAnswer,
			_id: this._id,
			verifiedAt: this.verifiedAt,
			createdBy: createdByPublic,
			seen: !!this.seenByQuestionerAt
		};
	} else if (this.firstWord == undefined || this.lastWord === undefined)
		return {
			type: "unknown",
			_id: this._id,
			createdBy: createdByPublic,
			seen: !!this.seenByQuestionerAt
		};

	const article = await Articles.findById(this.articleId);
	if (!article) throw new Error("Answer does not have valid article ID");

	let textSpan: string;

	try {
		const DELIMITER = " ";
		const wordArray = article.paragraphs[this.paragraphIndex].split(DELIMITER);
		const answerWords = wordArray.slice(this.firstWord, this.lastWord + 1);
		textSpan = answerWords.join(" ");
	} catch (e) {
		textSpan = "Svar fannst ekki";
	}

	return {
		type: "text-span",
		textSpan,
		_id: this._id,
		verifiedAt: this.verifiedAt,
		createdBy: createdByPublic,
		seen: !!this.seenByQuestionerAt
	};
};
