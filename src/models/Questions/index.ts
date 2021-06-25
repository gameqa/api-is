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
		type: Boolean
	}
});

questionSchema.methods = methods;
questionSchema.statics = statics;

questionSchema.pre<QuestionsInterface>("save", async function (next) {
	if (this.isModified("text")) {
		this.text = this.text.trim();
		if (this.text.split(" ").length < utils.MIN_WORD_COUNT)
			throw new Error(
				`Question must be at least ${utils.MIN_WORD_COUNT} words`
			);
		if (this.text.charAt(this.text.length - 1) !== "?")
			throw new Error("Question must end in question mark");
	}

	if (this.isModified("creationRoundId")) {
		const doc = await GameRounds.findById(this.creationRoundId);
		if (!doc)
			throw new Error(
				`Game round not found with id ${this.creationRoundId} to create question ${this.text}`
			);
	}

	if (this.isNew) {
		this.verifycationRoundIds = [];
		this.verifiedAt = undefined;
		this.archived = false;
		this.isImpossible = false;
		this.answeredAt = undefined;
		this.isYesOrNo = undefined;
		this.isDisqualified = false
	}
	next();
});

export const Questions = model<
	QuestionsInterface,
	QuestionsCollectionInterface
>("questions", questionSchema, "questions");

export * from "./interface";
