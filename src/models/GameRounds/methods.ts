import { Types } from "mongoose";
import { Questions, GameRounds, Articles, Answers } from "..";
import { ArticleSourceIdentifier } from "../ArticleSources";
import {
	GameRoundsInterface,
	TaskUserPayload,
	GameRoundWithTask,
} from "./interface";

export const advance = async function (
	this: GameRoundsInterface,
	userPayload: TaskUserPayload
): Promise<GameRoundWithTask> {
	if (this.completedAt)
		throw new Error("Can not advance game round that is completed");

	let isCompleted = false;

	switch (userPayload.type) {
		/**
		 * switch through possible tasks
		 * that user could have been solving
		 */
		case "make-question":
			/**
			 * If user just made a question, we create it
			 * and if it fails we throw a new error
			 */
			try {
				await Questions.create({
					...userPayload,
					creationRoundId: this._id,
				});
			} catch (error) {
				throw new Error(
					`Unable to create question with payload sent: ${error.message}`
				);
			}
			break;
		case "verify-question":
			/**
			 * If the user was verifying a question
			 * we check if the 'archive' property exists
			 * in the payload, if not then we verify it..
			 * otherwise we mark it as archived
			 */
			try {
				const question = await Questions.findById(
					userPayload.questionId
				);
				if (!question)
					throw new Error("Question not found with this _id");
				if (userPayload.archive)
					await question.update({ $set: { archived: true } });
				else await question.verify(this.userId);
			} catch (error) {
				throw new Error(
					`Unable to verify question with payload sent: ${error.message}`
				);
			}
			break;
		case "find-article":
			/**
			 * If the user just found an article
			 * for a question then we need to start
			 * by finding said article, and then create
			 * an answer that links those two together
			 */
			try {
				const {
					identifier,
					key,
					questionId,
					paragraphIndex,
				} = userPayload;
				// find the article, and set upsert to true
				const article = await Articles.findArticleByKey(
					identifier as ArticleSourceIdentifier,
					key,
					true
				);
				// throw error if no article found
				if (!article)
					throw new Error(
						`Article not found for ${identifier} ${key}`
					);
				// create an article
				await Answers.create({
					creationRoundId: this._id,
					articleId: article._id,
					questionId,
					paragraphIndex,
				});
			} catch (error) {
				throw new Error(
					`Unable to create answer with article/question for payload sent: ${error.message}`
				);
			}
			break;
		case "archive-answer":
			/**
			 * If user selects to archive answer then he is marking the answer as
			 * archived, this means that the answer which links paragraphs in articles
			 * and questions together does not contain relevant information
			 * to answer the question
			 */
			try {
				await Answers.findByIdAndArchive(userPayload.answerId);
			} catch (error) {
				throw new Error(
					`Unable to archive answer with _id ${userPayload.answerId} in advance gameRound`
				);
			}
			break;
		case "locate-span":
			/**
			 * If the user chose to locate span then
			 * he has found a span inside a paragraph in a article
			 * which answers a certain question
			 *
			 * the findByIdAndSetSpan methods handles relevant
			 * logic and is aclled directly
			 */
			try {
				console.log(userPayload);
				await Answers.findByIdAndSetSpan(userPayload.answerId, {
					roundId: this._id,
					...userPayload,
				});
			} catch (error) {
				throw new Error(
					`Unable to save span in advance logic due to '${error.message}'`
				);
			}

			break;
		default:
			throw new Error(
				`Advance logic not implemented for ${userPayload.type}`
			);
	}
	if (this.currentRound === this.totalRounds) {
		isCompleted = true;
		this.completedAt = new Date();
		await this.update({ $set: { completedAt: this.completedAt } });
		return {
			currentRound: this.currentRound,
			totalRounds: this.totalRounds,
			_id: this._id,
			taskInfo: {
				type: "completed",
			},
		};
	}
	this.currentRound++;
	await this.update({ $set: { currentRound: this.currentRound } });
	// reuse logic to get game round
	return await GameRounds.findByUserId(this.userId);
};
