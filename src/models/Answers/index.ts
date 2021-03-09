import { Schema, model, Types } from "mongoose";
import { AnswerInterface, AnswerCollectionInterface } from "./interface";
import { Users, Questions, Paragraphs } from "../";

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
		questionId: {
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
	const spanModified =
		this.isModified("firstWord") || this.isModified("lastWord");
	if (spanModified) {
		if (this.firstWord >= this.lastWord)
			throw new Error("Word range must have positive span");
	}
	if (this.isModified("submittedBy")) {
		const user = await Users.findById(this.submittedBy);
		if (!user) throw new Error("No user found with this id");
	}
	if (this.isModified("questionId")) {
		const question = await Questions.findById(this.questionId);
		if (!question) throw new Error("No user found with this id");
		if (spanModified) {
			const paragraph = await Paragraphs.findById(question.paragraphId);
			const words = paragraph.context.split(" ");
			const wordCount = words.length;
			if (wordCount < this.lastWord || wordCount < this.firstWord)
				throw new Error(
					"first and last words out of range for paragraph"
				);
		}
	}
	next();
});

export const Answers = model<AnswerInterface, AnswerCollectionInterface>(
	"answers",
	answerSchema,
	"answers"
);
export * from "./interface";
