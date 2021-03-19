import { Schema, model, Types } from "mongoose";
import { AnswersCollectionInterface, AnswersInterface } from "./interface";
import { Questions } from "../";

const answerSchema = new Schema({
	questionId: {
		type: Types.ObjectId,
		required: true,
	},
});

answerSchema.pre<AnswersInterface>("save", async function (next) {
	if (this.isModified("questionId")) {
		const doc = await Questions.findById(this.questionId);
		if (!doc)
			throw new Error(
				`Question with id ${this.questionId} not found when creating answer`
			);
	}
	next();
});

export const Answers = model<AnswersInterface, AnswersCollectionInterface>(
	"answers",
	answerSchema,
	"answers"
);

export * from "./interface";
