import { Types } from "mongoose";
import { Articles } from "..";
import {
	AnswersCollectionInterface,
	AnswersInterface,
	SpanAnswer,
} from "./interface";

export const findByIdAndSetSpan = async function (
	this: AnswersCollectionInterface,
	id: string | Types.ObjectId,
	answer: SpanAnswer
): Promise<AnswersInterface | null> {
	const doc = await this.findById(id);
	if (!doc) return null;
	doc.answerRoundId = answer.roundId;
	doc.firstWord = answer.firstWord;
	doc.lastWord = answer.lastWord;
	doc.answeredAt = new Date();
	await doc.save();
};
