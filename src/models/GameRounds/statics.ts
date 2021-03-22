import { Types } from "mongoose";
import Game, { GameMaster } from "./GameMaster";
import {
	GameRoundsCollectionInterface,
	GameRoundWithTask,
	TaskInfo,
} from "./interface";
import { Answers, Questions } from "../";

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
				ideaWords: ["abc", "dec", "fegh", "fegh"],
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
			});
			const doc = docs[Math.floor(Math.random() * docs.length)];
			// TODO[ ]: finish implementation fo this
			taskInfo = {
				type: "find-article",
				text: "Why is this hardcoded?",
				paragraph: "Lorem Ipsum",
				_id: Types.ObjectId(),
			};
			break;
		}
		default:
			throw new Error("Task selected that was not recognized");
	}

	return {
		_id,
		currentRound,
		totalRounds,
		taskInfo,
	};
};
