import { Types } from "mongoose";
import { QuestionsCollectionInterface, Users } from "../";
import { Answers } from "../Answers";
import { QuestionsWithAnswers } from "./interface";

/**
 * This function finds and archives a specific question
 *
 * @param this - type declaration
 * @param id - id of question to mark as archived
 * @returns the archived Question
 */
export const findByIdAndArchive = async function (
	this: QuestionsCollectionInterface,
	id: Types.ObjectId
) {
	return await this.findByIdAndUpdate(id, {
		$set: { archived: true },
	});
};

/**
 * @deprecated - no longer supported
 *
 * Here for backwards compatability
 * Original purpose was to suggest a question word to create a question out of
 *
 * @param this - type declaration
 * @returns string
 */
export const getQuestionWord = function (
	this: QuestionsCollectionInterface
): string {
	const sample = Math.random();
	if (sample < 0.3) return "Hvað";
	else if (sample < 0.49) return "Hvernig";
	else if (sample < 0.63) return "Hvenær";
	else if (sample < 0.77) return "Hvar";
	else if (sample < 0.87) return "Já/Nei";
	else if (sample < 0.96) return "Hver";
	else if (sample < 0.99) return "Hvor";
	else return "Afhverju";
};

/**
 * This function finds and marks a specific question as impossible
 *
 * @param this - type declaration
 * @param _id - id of the quesiton to mark as impossible
 * @returns QuestionInterface, the question marked impossible
 */
export const findByIdAndMarkAsImpossible = async function (
	this: QuestionsCollectionInterface,
	_id: string | Types.ObjectId
) {
	// find question
	const doc = await this.findByIdAndUpdate(_id, {
		$set: {
			isImpossible: true,
		},
	});
	// check if question is found, if not throw error
	if (!doc)
		throw new Error(`No question with _id ${_id} found to mark as impossible`);
	return doc;
};

/**
 *
 * @param this - type declaration
 * @param userId - id of the question to find and populate answers
 * @returns QuestionWithAnswers, the question with answers.
 */
export const findByUserIdAndPopulateAnswers = async function (
	this: QuestionsCollectionInterface,
	userId: Types.ObjectId
) {
	// find questions by specific user
	const docs = await this.find({ createdBy: userId });

	// find answers to the users questions
	const answers = await Promise.all(
		docs.map((question) => Answers.find({ questionId: question._id }))
	);

	// put question with answer into array of objects
	// @ts-ignore
	const output: QuestionsWithAnswers[] = docs.map((doc, i) => ({
		...doc.toObject(),
		answers: answers[i].filter((answer) => !!answer.verifiedAt),
	}));
	return output;
};
