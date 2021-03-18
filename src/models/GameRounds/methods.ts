import { Types } from "mongoose";
import { GameRoundsInterface } from "./interface";

export const advance = async function (this: GameRoundsInterface) {
	await this.update({ $set: { currentRound: this.currentRound + 1 } });
};
