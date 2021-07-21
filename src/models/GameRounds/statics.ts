import { Types } from "mongoose";
import Game from "./GameMaster";
import {
	GameRoundsCollectionInterface,
	GameRoundWithTask,
	TaskInfo,
} from "./interface";
import { Answers, Articles, Questions } from "../";
import * as IdeaWords from "./IdeaWords";
import * as askByImage from "./AskByImage";

/**
 * A static function that finds (OR CREATES)
 * a game round based on a userId
 *
 * case i) if there is a round already in progress, that gameRound is returned
 * case ii) else we create a new game round
 *
 * After a gameround has been initialized in memory
 * we pick a task based on a scheduler system for the
 * current gameRound which can be used to tell
 * the user what to do next
 * @param this
 * @param userId
 */
export const findByUserId = async function (
	this: GameRoundsCollectionInterface,
	userId: Types.ObjectId
): Promise<GameRoundWithTask> {
	/**
	 * PART 1 of the procedure
	 *
	 * GETTING OR SETTING A GAME ROUND
	 *
	 * In the next lines we try to find an
	 * uncompleted game round, and if that
	 * is unsuccessful we, instead, create
	 * a game round from scratch
	 *
	 * That should mean that that either
	 * case i) user has never played before
	 * case ii) the last time a user played
	 *     he completed the round and didn't start
	 *     a new game round
	 */
	// find a document with this userId
	let doc = await this.findOne({
		userId,
		completedAt: { $exists: false },
	});

	// if no document is found.. then we create it
	if (!doc) doc = await this.create({ userId });

	/**
	 * PART 2 of the procedure
	 *
	 * TASK TYPE SCHEDULING
	 *
	 * the below call calls the 'GameMaster' which
	 * handles scheduling which task type to give to the user
	 *
	 * This is done to decouple the scheduling of task types
	 * logic from the logic involved with
	 * picking an individual task
	 */
	const task = await Game.getTask(userId);

	/**
	 * PART 3 of the procedure
	 *
	 * INDIVIDUAL TASK SCHEDULING
	 *
	 * We take the task type given to us
	 * from the game master and switch-case
	 * through each Task Type and find an individual
	 * resource pertaining to the task type
	 * which we can ask the user to take a look at
	 * and work on as a part of the game
	 */

	// task info decleration which is then
	// initialized in the switch case stmnt below
	let taskInfo: TaskInfo;
	const { _id, currentRound, totalRounds } = doc;

	switch (task) {
		case "make-question": {
			/**
			 * if 'make-question' is chosen
			 * then the relevant task info is
			 * given back including 'ask-question'
			 * which tells the front end to ask a question
			 * and the relevant ideawords
			 */
			const IDEA_WORD_COUNT = 7;
			taskInfo = {
				type: "make-question",
				ideaWords: IdeaWords.get(IDEA_WORD_COUNT),
				questionType: Questions.getQuestionWord(),
				image: askByImage.getImage(),
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
				isImpossible: false,
				archived: false,
				createdBy: { $ne: userId },
				isDisqualified: false,
			});
			const doc = docs[Math.floor(Math.random() * docs.length)];
			taskInfo = {
				type: "verify-question",
				text: doc.text,
				_id: doc._id,
				isYesOrNo: doc.isYesOrNo,
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
				isImpossible: false,
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
				firstWord: doc.firstWord,
				lastWord: doc.lastWord,
				isYesOrNo: question.isYesOrNo,
			};
			break;
		}
		default:
			throw new Error(`Task ${task} selected that was not recognized`);
	}

	// return object that has the gameRoundId, round progress info and task info
	return {
		_id,
		currentRound,
		totalRounds,
		taskInfo,
	};
};
