import { Schema, model } from "mongoose";
import { AnswerInterface, AnswerCollectionInterface } from "./interface";

const answerSchema = new Schema(
	{
		firstWord: {
			type: String,
			required: true,
		},
		lastWord: {
			type: String,
			required: true,
		},
		// lastWord
		// submittedBy
		// questionId
		// ^ firstWord in range of questions para
		// ^ lastwordInRange of questions para
	},
	{
		timestamps: true,
	}
);

answerSchema.pre<AnswerInterface>("save", async function (next) {
	if (this.isModified("firstWord") || this.isModified("lastWord")) {
		if (this.firstWord >= this.lastWord)
			throw new Error("Word range must have positive span");
	}
	next();
});

export const Answers = model<AnswerInterface, AnswerCollectionInterface>(
	"answers",
	answerSchema,
	"answers"
);
export * from "./interface";
