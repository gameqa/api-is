import { Schema, model } from "mongoose";

const answerSchema = new Schema(
	{},
	{
		timestamps: true,
	}
);

export const Answers = model("answers", answerSchema, "answers");
export * from "./interface";
