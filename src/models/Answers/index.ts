import { Schema, model } from "mongoose";
import { AnswersCollectionInterface, AnswersInterface } from "./interface";

const answerSchema = new Schema({});

export const Answers = model<AnswersInterface, AnswersCollectionInterface>(
	"answers",
	answerSchema,
	"answers"
);

export * from "./interface";
