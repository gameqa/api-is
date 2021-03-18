import { Schema, model } from "mongoose";
import {
	QuestionsCollectionInterface,
	QuestionsInterface,
} from "./interface";
import * as utils from "./utils";

const questionSchema = new Schema({
	text: {
		type: String,
		required: true,
		trim: true,
	},
});

questionSchema.pre<QuestionsInterface>("save", async function (next) {
	if (this.isModified("text")) {
		if (this.text.split(" ").length < utils.MIN_WORD_COUNT)
			throw new Error(
				`Question must be at least ${utils.MIN_WORD_COUNT} words`
			);
		if (this.text.charAt(this.text.length - 1) !== "?")
			throw new Error("Question must end in question mark");
	}

	next();
});

export const Questions = model<
	QuestionsInterface,
	QuestionsCollectionInterface
>("questions", questionSchema, "questions");

export * from "./interface";
