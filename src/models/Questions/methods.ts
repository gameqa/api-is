import { Types } from "mongoose";
import { QuestionsInterface, Users } from "../";
import { VERIFICATION_COUNTS } from "./utils";

export const verify = async function (
	this: QuestionsInterface,
	userId: Types.ObjectId
) {
	const user = await Users.findById(userId);
	if (!user) throw new Error("Verification must come from a userId");

	await this.update({
		$push: { verifycationRoundIds: userId },
		$set: {
			...(this.verifycationRoundIds.length + 1 ===
			VERIFICATION_COUNTS
				? { verifiedAt: new Date() }
				: {}),
		},
	});
};

export const markAsAnswered = async function (this: QuestionsInterface) {
	await this.update({
		$set: { answeredAt: new Date() },
	});
};

export const markAsUnAnswered = async function (this: QuestionsInterface) {
	await this.update({
		$unset: { answeredAt: "" },
	});
};
