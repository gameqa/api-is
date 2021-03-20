import { Types } from "mongoose";
import { QuestionsCollectionInterface, Users } from "../";

export const findByIdAndArchive = async function (
	this: QuestionsCollectionInterface,
	id: Types.ObjectId
) {
	return await this.findByIdAndUpdate(id, {
		$set: { archived: true },
	});
};
