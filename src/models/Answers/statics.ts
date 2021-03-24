import { Types } from "mongoose";
import { Questions } from "../Questions";
import {
	AnswersCollectionInterface,
	AnswersInterface,
	SpanAnswer,
} from "./interface";

export const findByIdAndSetSpan = async function (
	this: AnswersCollectionInterface,
	id: string | Types.ObjectId,
	answer: SpanAnswer
): Promise<AnswersInterface> {
	const doc = await this.findById(id);
	if (!doc) throw new Error(`No Answer found with id ${id}`);
	doc.answerRoundId = answer.roundId;
	doc.firstWord = answer.firstWord;
	doc.lastWord = answer.lastWord;
	doc.answeredAt = new Date();
	return await doc.save();
};

export const findByIdAndArchive = async function (
	this: AnswersCollectionInterface,
	id: Types.ObjectId
) {
	const res = await this.findByIdAndUpdate(id, {
		$set: { archived: true },
	});
	if (!!res)
		await Questions.findByIdAndUpdate(res.questionId, {
			$unset: { answeredAt: "" },
		});
	return res;
};
