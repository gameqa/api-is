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
import * as statics from "./statics";
import * as methods from "./methods";

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
	firstWord: {
		type: Number,
	},
	lastWord: {
		type: Number,
	},
	answerRoundId: {
		type: Types.ObjectId,
	},
	verificationRoundIds: {
		type: [Types.ObjectId],
	},
	verifiedAt: {
		type: Date,
	},
	answeredAt: {
		type: Date,
	},
	archived: {
		type: Boolean,
	},
	canBeShortened: {
		type: Boolean,
	},
	yesOrNoAnswer: {
		type: Boolean,
	},
});

answerSchema.methods = methods;
answerSchema.statics = statics;

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
		await question.markAsAnswered();
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
		this.isModified("paragraphIndex") ||
		this.isModified("lastWord")
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
		if (
			article.paragraphs[this.paragraphIndex].length - 1 <
				this.lastWord &&
			!!this.lastWord
		)
			throw new Error("Last word can not be OOB for paragraph");
	}

	if (this.firstWord > this.lastWord)
		throw new Error("Span can not have negative range");
	if (this.firstWord < 0)
		throw new Error("first word of span can not be negative");
	if (this.isNew) {
		this.firstWord = undefined;
		this.lastWord = undefined;
		this.answerRoundId = undefined;
		this.verificationRoundIds = [];
		this.verifiedAt = undefined;
		this.answeredAt = undefined;
		this.archived = false;
		this.canBeShortened = false;
		this.yesOrNoAnswer = undefined;
	}

	if (this.isModified("questionId") && question.isYesOrNo) {
		this.firstWord = 0;
		this.lastWord = 0;
		this.answeredAt = new Date();
	}

	next();
});

export const Answers = model<AnswersInterface, AnswersCollectionInterface>(
	"answers",
	answerSchema,
	"answers"
);

export * from "./interface";
