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

export const getQuestionWord = function (
	this: QuestionsCollectionInterface
): string {
	const sample = Math.random();
	if (sample < 0.3) return "Hvað";
	else if (sample < 0.49) return "Hvernig";
	else if (sample < 0.63) return "Hvenær";
	else if (sample < 0.77) return "Hvar";
	else if (sample < 0.87) return "Já/Nei";
	else if (sample < 0.96) return "Hver";
	else if (sample < 0.99) return "Hvor";
	else return "Afhverju";
};
