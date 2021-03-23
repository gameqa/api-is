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
		case "make-question":
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
	return await GameRounds.findByUserId(this.userId);
};
