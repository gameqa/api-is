import { Schema, model, Types } from "mongoose";
import { AnswersCollectionInterface, AnswersInterface } from "./interface";
import {
	Questions,
	GameRounds,
	Articles,
	QuestionsInterface,
	GameRoundsInterface,
	ArticlesInterface,
} from "../";

const answerSchema = new Schema({
	questionId: {
		type: Types.ObjectId,
		required: true,
	},
	creationRoundId: {
		type: Types.ObjectId,
		required: true,
	},
	articleId: {
		type: Types.ObjectId,
		required: true,
	},
	paragraphIndex: {
		type: Number,
		required: true,
	},
});

answerSchema.pre<AnswersInterface>("save", async function (next) {
	let question: QuestionsInterface;
	let round: GameRoundsInterface;
	let article: ArticlesInterface;

	if (this.isModified("questionId")) {
		question = await Questions.findById(this.questionId);
		if (!question)
			throw new Error(
				`Question with id ${this.questionId} not found when creating answer`
			);
	}
	if (this.isModified("creationRoundId")) {
		round = await GameRounds.findById(this.creationRoundId);
		if (!round)
			throw new Error(
				`Round with id ${this.creationRoundId} not found when creating answer`
			);
	}
	if (
		this.isModified("articleId") ||
		this.isModified("paragraphIndex")
	) {
		article = await Articles.findById(this.articleId);
		if (!article)
			throw new Error(
				`Article with id ${this.articleId} not found when creating answer`
			);

		if (article.paragraphs.length - 1 < this.paragraphIndex)
			throw new Error("Paragraph index is out of bounds");
		if (this.paragraphIndex < 0)
			throw new Error("Paragraph index can not be negative");
	}
	next();
});

export const Answers = model<AnswersInterface, AnswersCollectionInterface>(
	"answers",
	answerSchema,
	"answers"
);

export * from "./interface";
