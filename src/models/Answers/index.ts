import { Schema, model, Types } from "mongoose";
import { AnswersCollectionInterface, AnswersInterface } from "./interface";
import {
	Questions,
	GameRounds,
	Articles,
	QuestionsInterface,
	GameRoundsInterface,
	ArticlesInterface,
} from "../";
import * as statics from "./statics";
import * as methods from "./methods";

const answerSchema = new Schema({
	questionId: {
		type: Types.ObjectId,
		required: true,
	},
	creationRoundId: {
		type: Types.ObjectId,
		required: true,
	},
	createdBy: {
		type: Types.ObjectId,
	},
	articleId: {
		type: Types.ObjectId,
		required: true,
	},
	paragraphIndex: {
		type: Number,
		required: true,
	},
	firstWord: {
		type: Number,
	},
	lastWord: {
		type: Number,
	},
	answerRoundId: {
		type: Types.ObjectId,
	},
	verificationRoundIds: {
		type: [Types.ObjectId],
	},
	verifiedAt: {
		type: Date,
	},
	answeredAt: {
		type: Date,
	},
	archived: {
		type: Boolean,
	},
	canBeShortened: {
		type: Boolean,
	},
	yesOrNoAnswer: {
		type: Boolean,
	},
	isDisqualified: {
		type: Boolean,
	},
	seenByQuestionerAt: {
		type: Date,
	},
});

answerSchema.methods = methods;
answerSchema.statics = statics;

/**
 * PRE SAVE HOOK for User model
 */
answerSchema.pre<AnswersInterface>("save", async function (next) {
	// declare variables
	let question: QuestionsInterface;
	let round: GameRoundsInterface;
	let article: ArticlesInterface;

	/**
	 * TRIGGER:
	 *    the answer model is newly created
	 *    note that the questionId should not change
	 * DESCRIPTION:
	 *    we check if the questionId truly exists
	 *    and mark the question as answered since
	 *    an answer has been created
	 * RESULT:
	 *    we know that the questionId is valid and
	 *    the questionId is marked as answered
	 */
	if (this.isModified("questionId")) {
		question = await Questions.findById(this.questionId);
		if (!question)
			throw new Error(
				`Question with id ${this.questionId} not found when creating answer`
			);
		await question.markAsAnswered();
	}

	/**
	 * TRIGGER:
	 *     the answer model is newly created
	 *     note that the creationRoundId should not change
	 * DESCRIPTION:
	 *     we verify that the gameround actually exists
	 * RESULT:
	 *     we are confident that the creationRoundId exists
	 */
	if (this.isModified("creationRoundId")) {
		round = await GameRounds.findById(this.creationRoundId);
		if (!round)
			throw new Error(
				`Round with id ${this.creationRoundId} not found when creating answer`
			);
	}

	/**
	 * TRIGGER:
	 *   Any infromation relating to articleId, or location of answer
	 *   within the article has been changed
	 * DESCRIPTION:
	 *   We check if the article exists, and throw an error if it doesnt
	 *   check if the paragraph index is within range
	 *   check whether the lastword is within range inside the selected paragraph
	 * RESULT:
	 *   we can trust that the answer metadata is valid
	 */
	if (
		this.isModified("articleId") ||
		this.isModified("paragraphIndex") ||
		this.isModified("lastWord")
	) {
		// check if article exists
		article = await Articles.findById(this.articleId);
		if (!article)
			throw new Error(
				`Article with id ${this.articleId} not found when creating answer`
			);

		// make sure paragraphIndex is within range
		if (article.paragraphs.length - 1 < this.paragraphIndex)
			throw new Error("Paragraph index is out of bounds");
		if (this.paragraphIndex < 0)
			throw new Error("Paragraph index can not be negative");

		// make sure lastWord does not go OOB in paragraph
		if (
			article.paragraphs[this.paragraphIndex].length - 1 < this.lastWord &&
			!!this.lastWord
		)
			throw new Error("Last word can not be OOB for paragraph");
	}

	/**
	 * TRIGGER:
	 *   this is always run
	 * DESCRIPTION:
	 *   make sure that the range is positive
	 * RESULT:
	 *   we can trust that lastword is correctly selected
	 *   relative to first word
	 */
	if (this.firstWord > this.lastWord)
		throw new Error("Span can not have negative range");

	/**
	 * TRIGGER:
	 *   this is always run
	 * DESCRIPTION:
	 *   make sure that the first word is non negative
	 * RESULT:
	 *   we know that the first word correctly indexes the paragraph
	 */
	if (this.firstWord < 0)
		throw new Error("first word of span can not be negative");

	/**
	 * TRIGGER:
	 *   only run when instance is first saved
	 * DESCRIPTION:
	 *   set default values
	 * RESULT:
	 *   these values can not be passed into constructor
	 */
	if (this.isNew) {
		this.firstWord = undefined;
		this.lastWord = undefined;
		this.answerRoundId = undefined;
		this.verificationRoundIds = [];
		this.verifiedAt = undefined;
		this.answeredAt = undefined;
		this.archived = false;
		this.canBeShortened = false;
		this.yesOrNoAnswer = undefined;
		this.isDisqualified = false;
		this.seenByQuestionerAt = undefined;
	}

	next();
});

/**
 *
 * The Answers model keeps track of an answer for a specific
 * question. Each answer belongs to only one question, but a
 * question can in fact have many answers. An answer is created
 * when an article is found that countains the answer. The answer
 * also contains more meta data. Which includes start of answer
 * span, end of answer span, is it a yes or no question and so on
 *
 *
 * @param {Types.ObjectId} questionId - Question which this answer is
 *     created to answer.
 *
 * @param {Types.ObjectId} creationRoundId - the game round in which
 *     this answer was created. An answer is created in the google
 *     search phase so the round in which this answer was googled.
 *
 * @param {Types.ObjectId} createdBy - _id of user which found the
 *     answer in the Google search phase
 *
 * @param {Types.ObjectId} articleId - _id of the article in which the
 *     user (who found the answer) has chosen as a candidate to answer
 *     this question
 *
 * @param {number} paragraphIndex - the index of the paragraph which
 *    the user (who found the answer) has chosen as a candidate inside
 *    the article to answer this question. If the article contains N
 *    paragraphs, then this number can range from 0 to N-1
 *
 * @param {number | undefined} firstWord - SET BY DEFAULT BY MODEL. This
 *     parameter can not and should not be passed in to the constructor.
 *     firstWord is by default set to undefined. In the select span step
 *     a user will submit the first word which will update this field in
 *     the resource
 *
 * @param {number | undefined} lastWord - SET BY DEFAULT BY MODEL. This
 *     parameter can not and should not be passed in to the constructor.
 *     lastWord is by default set to undefined. In the select span step
 *     a user will submit the last word which will update this field in
 *     the resource
 *
 * @param {Date | undefined} answeredAt - Answered is set as new Date()
 *     whenever an answer span is selected or a yes/no answer has been
 *     chosen for a yes/no question
 *
 * @param {Date | undefined} verifiedAt - SET BY DEFAULT BY MODEL. This
 *     parameter can not and should not be passed in to the constructor.
 *     When an answer (with a span or defined yes/no answer) has been
 *     verified a certain number of times by users the verifiedAt will be
 *     set as new Date()
 *
 * @param {boolean | undefined} archived - an answer is not archived by
 *     default. When a user is tasked by marking the span, answering yes/no
 *     or verifying the span or yes/no he has the option to say that the
 *     answer is incorrect or that it isn't present. When he does so
 *     the answer is marked as archivd.
 *
 * @param {boolean | undefined} canBeShortened - deprecated: original intention
 *     was to allow users to mark that an answer span is 'too wordy'. Due
 *     to problems with incorperating this into the front end this was
 *     in the end abandoned. This field is although still being set / updated.
 *     However, this field will not be included in the dataset gathered.
 *
 * @param {boolean | undefined} yesOrNoAnswer - if the question connected to
 *     this answer is a yes/no question the yesOrNoAnswer can be set to
 *     either true or false. True means that the answer to the question
 *     is 'yes', false on the other hand signifies that the answer to the
 *     question is 'no'.
 *
 * @param {boolean | undefined} isDisqualified - this field can be thought
 *     of as meaning that the answer should not be included in the final
 *     dataset. In this sense, we can think of 'archived' as a preamble
 *     to being 'isDisqualified'. 'archived' is marked by the user, and an
 *     admin could possibly verify the 'archived' status by making the
 *     answer 'isDisqualified', if the admin does not agree with the user
 *     the admin could decide to remove the 'archive' status and thus making
 *     the answer valid again.
 *
 * @param {Date | undefined} seenByQuestionerAt - undefined by default but
 *     set to new Date() as soon as the person who wrote the question (which
 *     this answer is set to create) sees the answer.
 *
 *
 * TODO: document answerRoundId
 * TODO: document verificationRoundIds
 *
 */
export const Answers = model<AnswersInterface, AnswersCollectionInterface>(
	"answers",
	answerSchema,
	"answers"
);

export * from "./interface";
