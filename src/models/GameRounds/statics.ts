import { Types } from "mongoose";
import { GameRoundsCollectionInterface } from "./interface";

export const findByUserId = async function (
	this: GameRoundsCollectionInterface,
	userId: Types.ObjectId
) {
	const doc = await this.findOne({ userId });
	if (doc) return doc;
	return await this.create({ userId });
};
