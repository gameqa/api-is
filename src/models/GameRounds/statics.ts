import { Types } from "mongoose";
import Game from "./GameMaster";
import {
	GameRoundsCollectionInterface,
	GameRoundWithTask,
	TaskInfo,
} from "./interface";
import { Answers, Articles, Questions } from "../";
import Faker from "faker";
import * as IdeaWords from "./IdeaWords";

export const findByUserId = async function (
	this: GameRoundsCollectionInterface,
	userId: Types.ObjectId
): Promise<GameRoundWithTask> {
	// find a document with this userId
	let doc = await this.findOne({
		userId,
		completedAt: { $exists: false },
	});
	// if no document is found.. then we create it
	if (!doc) doc = await this.create({ userId });

	// get a task from the game master
	const task = await Game.getTask();
	// task info decleration which is then
	// initialized in the switch case stmnt below
	let taskInfo: TaskInfo;
	// destructuring
	const { _id, currentRound, totalRounds } = doc;

	/**
	 * Switch through all tasks
	 * and populate the task info
	 * for the relevant task;
	 *
	 * this task type is defined by game
	 * master and is irrelevant for the
	 * interface which is used to define
	 * the response of this method
	 */
	switch (task) {
		case "make-question": {
			/**
			 * if 'make-question' is chosen
			 * then the relevant task info is
			 * given back including 'ask-question'
			 * which tells the front end to ask a question
			 * and the relevant ideawords
			 */
			taskInfo = {
				type: "make-question",
				ideaWords: IdeaWords.get(7),
				questionType: Questions.getQuestionWord(),
			};
			break;
		}
		case "verify-question": {
			/**
			 * If the 'verify-question' task is chosen
			 * by the game master then we need to
			 * find a question which does not have
			 * verifiedAt set.
			 *
			 * The taskinfo object has 'verify-question'
			 * which tells the front end that it
			 * needs to verify this question
			 */
			const docs = await Questions.find({
				verifiedAt: { $exists: false },
				answeredAt: { $exists: false },
				archived: false,
			});
			const doc = docs[Math.floor(Math.random() * docs.length)];
			taskInfo = {
				type: "verify-question",
				text: doc.text,
				_id: doc._id,
			};
			break;
		}
		case "find-article": {
			/**
			 * If the 'find-article' is chosen
			 * then we want to send the 'find-article'
			 * task to the front end. In this case we need
			 * to find a question which has 'answeredAt' as unset
			 *
			 * then we return the question which we want
			 * to find an article for
			 *
			 */
			const docs = await Questions.find({
				answeredAt: { $exists: false },
				verifiedAt: { $exists: true },
				archived: false,
			});
			const doc = docs[Math.floor(Math.random() * docs.length)];
			taskInfo = {
				type: "find-article",
				text: doc.text,
				_id: doc._id,
			};
			break;
		}
		case "locate-span": {
			/**
			 * If the 'locate-span' is chosen
			 * then we want to send the 'locate-span'
			 * task to the front end. In this case
			 * we need to find an Answer that has
			 * the 'answeredAt' property as unset / undefined
			 */
			const docs = await Answers.find({
				answeredAt: { $exists: false },
				questionId: { $exists: true },
				archived: false,
			});
			const doc = docs[Math.floor(Math.random() * docs.length)];
			const article = await Articles.findById(doc.articleId);
			if (!article)
				throw new Error(
					`Article not found with id ${doc.articleId} to create 'locate-span' task`
				);
			const question = await Questions.findById(doc.questionId);
			if (!question)
				throw new Error(
					`Question not found with id ${doc.questionId} to create 'locate-span' task`
				);
			taskInfo = {
				type: "locate-span",
				paragraph: article.paragraphs[doc.paragraphIndex],
				text: question.text,
				_id: doc._id,
			};
			break;
		}
		case "verify-span": {
			/**
			 * If the 'verify-span' was chosen
			 * then the user should be instructed to verify
			 * a random span of an answer that has
			 * had its span submitted
			 *
			 * */
			const docs = await Answers.find({
				answeredAt: { $exists: true },
				verifiedAt: { $exists: false },
				firstWord: { $exists: true }, // makes sure this has been submitted
				lastWord: { $exists: true }, // makes sure this has been submitted
				archived: false,
			});
			const doc = docs[Math.floor(Math.random() * docs.length)];
			if (!doc)
				throw new Error(
					`Unable to find article for answer that needs verifiecation`
				);
			const article = await Articles.findById(doc.articleId);
			if (!article)
				throw new Error(
					`Article not found with id ${doc.articleId} to verify span task`
				);
			const question = await Questions.findById(doc.questionId);
			if (!question)
				throw new Error(
					`Question not found with id ${doc.questionId} for 'verify-span' task`
				);
			taskInfo = {
				type: "verify-span",
				paragraph: article.paragraphs[doc.paragraphIndex],
				text: question.text,
				_id: doc._id,
				firstWord: doc.firstWord!,
				lastWord: doc.lastWord!,
			};
			break;
		}
		default:
			throw new Error(
				`Task ${task} selected that was not recognized`
			);
	}

	return {
		_id,
		currentRound,
		totalRounds,
		taskInfo,
	};
};
