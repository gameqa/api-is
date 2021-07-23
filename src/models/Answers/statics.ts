import { Types } from "mongoose";
import { Questions } from "../Questions";
import {
	AnswersCollectionInterface,
	AnswersInterface,
	SpanAnswer,
} from "./interface";

/**
 * Function that finds an answer and sets the
 * firstword - lastWord fields which define
 * the text span of that answer.
 * @param this - for TS type decleration only
 * @param id - the Answer id to serach for
 * @param answer - interface contianing information about span
 */
export const findByIdAndSetSpan = async function (
	this: AnswersCollectionInterface,
	id: string | Types.ObjectId,
	answer: SpanAnswer
): Promise<AnswersInterface> {
	// make sure answer exists
	const doc = await this.findById(id);
	if (!doc) throw new Error(`No Answer found with id ${id}`);

	// set information about span + meta info
	doc.answerRoundId = answer.roundId;
	doc.firstWord = answer.firstWord;
	doc.lastWord = answer.lastWord;
	doc.answeredAt = new Date();

	// save document
	return await doc.save();
};

/**
 * Function that finds an answer by _id and
 * archives is
 * @param this - for TS type decleration only
 * @param id  - the answer we want to archive
 */
export const findByIdAndArchive = async function (
	this: AnswersCollectionInterface,
	id: Types.ObjectId
) {
	// call mongoos method to update
	const res = await this.findByIdAndUpdate(id, {
		$set: { archived: true },
	});

	// remove answeredAt field at any relevant question
	if (!!res)
		await Questions.findByIdAndUpdate(res.questionId, {
			$unset: { answeredAt: "" },
		});

	// return the answer
	return res;
};
