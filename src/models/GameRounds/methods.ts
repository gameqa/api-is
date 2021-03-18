import { Types } from "mongoose";
import { GameRoundsInterface } from "./interface";

export const advance = async function (this: GameRoundsInterface) {
	if (this.currentRound < this.totalRounds) {
		this.currentRound++;
		await this.update({ $set: { currentRound: this.currentRound } });
		return;
	}
	this.completedAt = new Date();
	await this.update({ $set: { completedAt: this.completedAt } });
};
