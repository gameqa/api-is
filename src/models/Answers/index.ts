import { Schema, model } from "mongoose";

const answerSchema = new Schema(
	{
		// firstWord
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

export const Answers = model("answers", answerSchema, "answers");
export * from "./interface";
