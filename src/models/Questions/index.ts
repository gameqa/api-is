import { Schema, model, Types } from "mongoose";
import { QuestionsCollectionInterface, QuestionsInterface } from "./interface";
import * as utils from "./utils";
import { GameRounds } from "../";
import * as methods from "./methods";
import * as statics from "./statics";

const questionSchema = new Schema({
	text: {
		type: String,
		required: true,
		trim: true,
	},
	creationRoundId: {
		type: Types.ObjectId,
		required: true,
	},
	createdBy: {
		type: Types.ObjectId,
	},
	verifycationRoundIds: {
		type: Array,
		default: [],
	},
	verifiedAt: {
		type: Date,
		default: undefined,
	},
	answeredAt: {
		type: Date,
	},
	archived: {
		type: Boolean,
	},
	isImpossible: {
		type: Boolean,
	},
	isYesOrNo: {
		type: Boolean,
	},
	isDisqualified: {
		type: Boolean,
	},
	archiveReason: {
		type: String,
	},
});

questionSchema.methods = methods;
questionSchema.statics = statics;

/**
 * PRE SAVE HOOK FOR QUESTION MODEL
 */
questionSchema.pre<QuestionsInterface>("save", async function (next) {
	/**
	 * TRIGGER:
	 *     new instance of question created
	 *
	 * DESCRIPTION:
	 *     when user creates a question, trim the question
	 *     check if question is valid, check length and if it ends with a questionmark
	 *
	 * RESULT:
	 *     the valid question is trimmed, else if not valid, throw error
	 */
	if (this.isModified("text")) {
		this.text = this.text.trim();
		if (this.text.split(" ").length < utils.MIN_WORD_COUNT)
			throw new Error(
				`Question must be at least ${utils.MIN_WORD_COUNT} words`
			);
		if (this.text.charAt(this.text.length - 1) !== "?")
			throw new Error("Question must end in question mark");
	}

	/**
	 * TRIGGER:
	 *     the question model is newly created
	 *     note the creatinRoundId should not change
	 *
	 * DESCRIPTION:
	 *     we verify that the gameround actually exists
	 *
	 * RESULT:
	 *    we are confident that teh creationRoundId exists
	 */
	if (this.isModified("creationRoundId")) {
		const doc = await GameRounds.findById(this.creationRoundId);
		if (!doc)
			throw new Error(
				`Game round not found with id ${this.creationRoundId} to create question ${this.text}`
			);
	}

	/**
	 * TRIGGER:
	 *     new instance of question created
	 *
	 * DESCRIPTION:
	 *     setting required default values
	 * RESULT:
	 *     New question is created with default values
	 */
	if (this.isNew) {
		this.verifycationRoundIds = [];
		this.verifiedAt = undefined;
		this.archived = false;
		this.isImpossible = false;
		this.answeredAt = undefined;
		this.isYesOrNo = undefined;
		this.isDisqualified = false;
		this.archiveReason = undefined;
	}

	/**
	 * Check if archiveReason is valid, else throw error
	 */
	if (this.archiveReason && this.isModified("archiveReason")) {
		if (!utils.ARCHIVE_REASONS.includes(this.archiveReason))
			throw new Error("Archive reason is not valid");
	}
	next();
});

/**
 * @param {string} text - the question text
 * @param {ObjectId} creationRoundId - unique id of the gameround the question was created in
 * @param {ObjectId | undefined} createdBy - should not be undefined, only optional for backwards compatability
 *     _id of user that created the question
 * @param {ObjectId[] } verifycationRoundIds - unique ids af the gameround the question was verified in
 * @param {Date | undefined} verifiedAt - The date of the questions last verification
 * @param {boolean} archived - Boolean value, if question is marked bad it is true else false by default
 * @param {ArchiveReason | undefined} archiveReason - deprecated, no longer supported
 * @param {Date | undefined} answeredAt - The date of which an answer was found in the google search for the question
 * @param {boolean} isImpossible - Boolean value, if user marks the question has no answer isImpossible is true
 *     else false by default.
 * @param {boolean | undefined} isYesOrNo - Boolean value,
 *     case i) undefined, question not marked
 *     case ii) true, quesiton is marked as possible to answer with yes/no
 *     case iii) false, marked question has a text answer.
 * @param {boolean} isDisqualified - - this field can be thought
 *     of as meaning that the question should not be included in the final
 *     dataset. In this sense, we can think of 'archived' as a preamble
 *     to being 'isDisqualified'. 'archived' is marked by the user, and an
 *     admin could possibly verify the 'archived' status by making the
 *     question 'isDisqualified', if the admin does not agree with the user
 *     the admin could decide to remove the 'archive' status and thus making
 *     the question valid again
 *
 */

export const Questions = model<
	QuestionsInterface,
	QuestionsCollectionInterface
>("questions", questionSchema, "questions");

export * from "./interface";
