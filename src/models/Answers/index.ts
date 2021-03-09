import { Schema, model, Types } from "mongoose";
import { AnswerInterface, AnswerCollectionInterface } from "./interface";
import { Users } from "../";

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
		submittedBy: {
			type: Types.ObjectId,
			required: true,
		},
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
	if (this.isModified("submittedBy")) {
		const user = await Users.findById(this.submittedBy);
		if (!user) throw new Error("No user found with this id");
	}
	next();
});

export const Answers = model<AnswerInterface, AnswerCollectionInterface>(
	"answers",
	answerSchema,
	"answers"
);
export * from "./interface";
