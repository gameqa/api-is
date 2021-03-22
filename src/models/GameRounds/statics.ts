import { Types } from "mongoose";

import {
	GameRoundsCollectionInterface,
	GameRoundWithTask,
	TaskTypes,
} from "./interface";

export const findByUserId = async function (
	this: GameRoundsCollectionInterface,
	userId: Types.ObjectId
): Promise<GameRoundWithTask> {
	let doc = await this.findOne({
		userId,
		completedAt: { $exists: false },
	});
	if (!doc) doc = await this.create({ userId });
	return {
		currentRound: doc.currentRound,
		totalRounds: doc.totalRounds,
		_id: doc._id,
		taskInfo: {
			type: TaskTypes.askQuestion,
			ideaWords: [
				"orð",
				"aberrant",
				"bath",
				"scarf",
				"laborer",
				"balance",
				"detail",
				"tricky",
				"grip",
				"ethereal",
				"aberrant",
				"examine",
				"collect",
				"ripe",
			],
			deadline: new Date(),
		},
	};
};
