import { Schema, model } from "mongoose";
import {
	QuestionsCollectionInterface,
	QuestionsInterface,
} from "./interface";

const questionSchema = new Schema({});

export const Questions = model<
	QuestionsInterface,
	QuestionsCollectionInterface
>("questions", questionSchema, "questions");

export * from "./interface";
