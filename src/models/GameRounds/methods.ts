import { Types } from "mongoose";
import { Questions, GameRounds } from "..";
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
				else await question.verify(this._id);
			} catch (error) {
				throw new Error(
					`Unable to verify question with payload sent: ${error.message}`
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
