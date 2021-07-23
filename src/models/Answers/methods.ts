import { Types } from "mongoose";
import { AnswersInterface, PublicAnswer } from "./interface";
import { Users, Questions, Answers, Articles } from "..";
import { VERIFICATION_COUNTS } from "./utils";

/**
 * This function is called when a user wants to verify an answer.
 * The userId is a required parameter, but an optional canBeShortened
 * parameter can be passed as well.
 *
 * Support for canBeShortened has been deprecated
 *
 * @param this - for type decleration only
 * @param userId - id of user who wants to verify
 * @param canBeShortened - optional (deprecated) parameter which
 *    signals that the answer might be too long
 */
export const verify = async function (
	this: AnswersInterface,
	userId: Types.ObjectId,
	canBeShortened?: boolean
) {
	// verify that the user exists
	const user = await Users.findById(userId);
	if (!user) throw new Error("Verification must come from a userId");

	// store info on the verification
	await this.update({
		$push: { verificationRoundIds: userId },
		$set: {
			canBeShortened: (canBeShortened ?? false) || this.canBeShortened,
			// spread out object with  verifiedAt if we want to verify
			// set verifiedAt if verificationRounIds meet the necessary VERIFICATION_COUNTS
			...(this.verificationRoundIds.length + 1 === VERIFICATION_COUNTS
				? { verifiedAt: new Date() }
				: {}),
		},
	});
};

/**
 * This method sets the answer to a yes/or no question.
 *
 * Accepts the single {boolean} param which is answer.
 *    case i) answer is true: means that the answer to the question is 'yes'
 *    case ii) answer is false: means that the answer to the question is 'no'
 *
 * @param this - for type decleration only
 * @param answer - the answer to the question
 */
export const setYesOrNoAnswer = async function (
	this: AnswersInterface,
	answer: boolean
) {
	// destructure the questionId for convenience
	const { questionId } = this;

	// make sure the question exists
	const question = await Questions.findById(questionId);
	if (!question)
		throw new Error(
			`Trying to set yes or no answer but question ${questionId} not found`
		);

	// make sure the question is in fact a yes/no question
	if (!question.isYesOrNo)
		throw new Error(
			`Can not set yes or no answer in Answer that belongs to a question that is not yes or no`
		);

	// if the answer conflicts with a previous answer, archive this answer
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

	// update the value of the answer
	await this.update({ $set: { yesOrNoAnswer: answer } });
};

/**
 * Returns a public view of the answer
 *
 * The public view of the answer contains the relevant
 * text span and easily presentable information
 * to the front end.
 *
 * The returned type can be one of three
 *   case i) it is a yes no question, give information about the yes/no answer
 *   case ii) unknown question type
 *   case iii) text span can be present, return that as ap art of the interface
 *
 * @param this for TS type decleration only
 */
export const toPublic = async function (
	this: AnswersInterface
): Promise<PublicAnswer> {
	// make sure it has a valid question
	const question = await Questions.findById(this.questionId);
	if (!question) throw new Error("Answer does not have valid question ID");

	// get a public view of the answer creator
	const createdBy = await Users.findById(this.createdBy);
	const createdByPublic = createdBy ? createdBy.getPublic() : undefined;

	// return this as the public view if it is a yes/no question
	if (question.isYesOrNo) {
		return {
			type: "yes-no",
			answerIs: this.yesOrNoAnswer,
			_id: this._id,
			verifiedAt: this.verifiedAt,
			createdBy: createdByPublic,
			seen: !!this.seenByQuestionerAt,
		};
	}
	// return this interface if it is has no word span selected
	else if (this.firstWord == undefined || this.lastWord === undefined)
		return {
			type: "unknown",
			_id: this._id,
			createdBy: createdByPublic,
			seen: !!this.seenByQuestionerAt,
		};

	/**
	 * If neither of the two if statements above are picked
	 * then we know that this is NOT a yes/no question and
	 * the answer has a span
	 *
	 * we start in this case by finding the article so we can
	 * present the answer span-string to the front end
	 */
	const article = await Articles.findById(this.articleId);
	if (!article) throw new Error("Answer does not have valid article ID");

	// declare text span
	let textSpan: string;

	try {
		// generate the text span from the article
		const DELIMITER = " ";
		const wordArray = article.paragraphs[this.paragraphIndex].split(DELIMITER);
		const answerWords = wordArray.slice(this.firstWord, this.lastWord + 1);
		textSpan = answerWords.join(" ");
	} catch (e) {
		// if the operation above fails, give default answer (answer not found)
		textSpan = "Svar fannst ekki";
	}

	// return this interface if text span has been selected
	return {
		type: "text-span",
		textSpan,
		_id: this._id,
		verifiedAt: this.verifiedAt,
		createdBy: createdByPublic,
		seen: !!this.seenByQuestionerAt,
	};
};
