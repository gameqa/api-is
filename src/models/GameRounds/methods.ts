import {
	Questions,
	GameRounds,
	Articles,
	Answers,
	AnswersInterface,
	UserInterface,
} from "..";
import { ArticleSourceIdentifier } from "../ArticleSources";
import {
	GameRoundsInterface,
	TaskUserPayload,
	GameRoundWithTask,
} from "./interface";

/**
 * Advances a current game round based
 * on the information provided by user
 *
 * This is the function that is called
 * whenever a user submits data from a
 * specific round
 *
 * @param this for type decleration only
 * @param userPayload the payload given by the user from the api route
 * @param user the user retrieved from session on frontend
 */
export const advance = async function (
	this: GameRoundsInterface,
	userPayload: TaskUserPayload,
	user: UserInterface
): Promise<GameRoundWithTask> {
	// check if gameRound has been completed
	if (this.completedAt)
		throw new Error("Can not advance game round that is completed");

	let isCompleted = false;

	/**
	 * Closure which can be used
	 * to wrap any asyncronous activity
	 * in this advance function
	 *
	 * Any activity, or function calls will
	 * not be executed if the user present
	 * in this closures context is shadowbanned
	 * @param cb
	 */
	const shadowBanWrapper = async (cb: () => Promise<void>) => {
		if (user.shadowBanned) return;
		await cb();
	};

	// logging
	console.log(
		`User ${this.userId} sent data to advance from ${userPayload.type}`
	);

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
				await shadowBanWrapper(async () => {
					await Questions.create({
						...userPayload,
						creationRoundId: this._id,
						createdBy: user._id,
					});
				});
				await user.update({ $inc: { questionCount: 1 } });
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
				await shadowBanWrapper(async () => {
					const question = await Questions.findById(userPayload.questionId);
					if (!question) throw new Error("Question not found with this _id");
					if (userPayload.archive)
						await question.update({
							$set: {
								archived: true,
								archiveReason: userPayload.archiveReason,
							},
						});
					else await question.verify(this.userId);
				});
				await user.update({ $inc: { verifyQuestionCount: 1 } });
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
				await shadowBanWrapper(async () => {
					const { identifier, key, questionId, paragraphIndex } = userPayload;
					// find the article, and set upsert to true
					const article = await Articles.findArticleByKey(
						identifier as ArticleSourceIdentifier,
						key,
						true
					);
					// throw error if no article found
					if (!article)
						throw new Error(`Article not found for ${identifier} ${key}`);
					const question = await Questions.findById(questionId);
					if (!question)
						throw new Error(`Unable to find question with id ${questionId}`);
					question.isImpossible = false;
					await question.save();
					// create an article
					await Answers.create({
						creationRoundId: this._id,
						articleId: article._id,
						questionId,
						paragraphIndex,
						createdBy: user._id,
					});
				});
				await user.update({ $inc: { articlesFoundCount: 1 } });
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
				await shadowBanWrapper(async () => {
					await Answers.findByIdAndArchive(userPayload.answerId);
				});
				await user.update({ $inc: { articlesFoundCount: 1 } });
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
				await shadowBanWrapper(async () => {
					await Answers.findByIdAndSetSpan(userPayload.answerId, {
						roundId: this._id,
						...userPayload,
					});
				});
				await user.update({ $inc: { answerCount: 1 } });
			} catch (error) {
				throw new Error(
					`Unable to save span in advance logic due to '${error.message}'`
				);
			}

			break;
		case "verify-span":
			/**
			 * If the user choses to verify a span
			 * then we expect the payload to include the
			 * _id of the answer and a boolean flag wether
			 * or not the span can be shortened
			 *
			 * we call the verify method on the answer found
			 * which updates the answer
			 */
			try {
				await shadowBanWrapper(async () => {
					const answer = await Answers.findById(userPayload._id);
					if (!answer)
						throw new Error(`${userPayload._id} is not a pkey of an answer`);
					const question = await Questions.findById(answer.questionId);
					if (!question)
						throw new Error(`can not find question by Id ${question._id}`);
					if (question.isYesOrNo)
						throw new Error(
							"Can not user 'verify-span' on yes or no questions"
						);
					await answer.verify(this.userId, userPayload.canBeShortened);
				});
				await user.update({ $inc: { verifyAnswerCount: 1 } });
			} catch (error) {
				throw new Error(
					`Unable to verify span in answer due to '${error.message}'`
				);
			}
			break;
		case "verify-yes-no-answer-paragraph":
			/**
			 * if the user chose this as the type
			 * then he is verifying an yes or no question with answer
			 * and verifying that the question is indeed answere by
			 * the paragraph marked in the answer
			 *
			 */
			let answer: AnswersInterface;
			try {
				await shadowBanWrapper(async () => {
					answer = await Answers.findById(userPayload.answerId);
					if (!answer)
						throw new Error(
							`${userPayload.answerId} is not a pkey of an answer`
						);
					const question = await Questions.findById(answer.questionId);
					if (!question)
						throw new Error(
							`can not find question by Id ${userPayload.answerId}`
						);
					if (!question.isYesOrNo)
						throw new Error(
							"Can only use 'verify-yes-no-answer-paragraph' on yes or no questions"
						);
				});
			} catch (error) {
				throw new Error(
					`Unable to verify yes or no answer due to '${error.message}'`
				);
			}

			try {
				await shadowBanWrapper(async () => {
					await answer.setYesOrNoAnswer(userPayload.answer);
					await answer.verify(this.userId);
				});
				await user.update({ $inc: { verifyAnswerCount: 1 } });
			} catch {
				// catch error but do nothing
			}
			break;
		case "mark-question-impossible":
			/**
			 * If user decides to mark question as
			 * impossible then he is essentially saying
			 * that he is not able to find the answer anywhere
			 *
			 * we call the Questions model api and mark the question
			 * with the _id present in userPayload as impossible
			 */
			try {
				await shadowBanWrapper(async () => {
					await Questions.findByIdAndMarkAsImpossible(userPayload.questionId);
				});
				await user.update({ $inc: { articlesFoundCount: 1 } });
			} catch (error) {
				throw new Error(
					`Not able to mark question as impossible in advance due to ${error.message}`
				);
			}
			break;
		case "set-yes-or-no-flag":
			/**
			 * This is for user to mark if a question is a yes or no
			 * question or not. This is a payload where you are still
			 * working with the question so only the answerId is present
			 */
			try {
				await shadowBanWrapper(async () => {
					if (userPayload.isYesOrNo === undefined)
						throw new Error("Payload isYesOrNo not given");

					const answer = await Answers.findById(userPayload.answerId);

					if (!answer) {
						throw new Error("Unable to find answer with the provided id");
					}

					if (answer.verifiedAt) {
						throw new Error("Answer is already verified");
					}

					const question = await Questions.findById(answer.questionId);

					if (!question) {
						throw new Error("Unable to find question id");
					}

					await question.update({
						isYesOrNo: userPayload.isYesOrNo,
					});

					if (userPayload.isYesOrNo) {
						await answer.update({
							firstWord: 0,
							lastWord: 0,
							answeredAt: new Date(),
						});
					} else {
						await answer.update({
							$unset: { firstWord: "", lastWord: "", answeredAt: "" },
							archived: true,
						});
					}
				});
			} catch (error) {
				throw new Error(
					`Unable to flag question as yes or no due to ${error.message}`
				);
			}
			break;
		default:
			throw new Error(`Advance logic not implemented for ${userPayload.type}`);
	}
	// if the round is completed we execute the following block
	if (this.currentRound === this.totalRounds) {
		isCompleted = true;
		// set completed at
		this.completedAt = new Date();

		// update the game round info
		await this.update({ $set: { completedAt: this.completedAt } });

		// increase the users level
		await user.update({ $inc: { level: 1 } });

		// let the user know that the round has been completed
		return {
			currentRound: this.currentRound,
			totalRounds: this.totalRounds,
			_id: this._id,
			taskInfo: {
				type: "completed",
			},
		};
	}

	// executed if the user has not completed the gameRound
	this.currentRound++;
	await this.update({ $set: { currentRound: this.currentRound } });

	// reuse logic to get game round task
	return await GameRounds.findByUserId(this.userId);
};
