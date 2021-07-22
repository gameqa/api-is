import { Types } from "mongoose";
import { QuestionsInterface, Users } from "../";
import { VERIFICATION_COUNTS } from "./utils";

/**
 * This function finds the user that verified the question
 * and updates the state of the question
 *
 * @param this - type declaration
 * @param userId - id of user you want to find
 */
export const verify = async function (
	this: QuestionsInterface,
	userId: Types.ObjectId
) {
	// check if userId is valid userID, else throw error
	const user = await Users.findById(userId);
	if (!user) throw new Error("Verification must come from a userId");

	await this.update({
		$push: { verifycationRoundIds: userId },
		$set: {
			...(this.verifycationRoundIds.length + 1 === VERIFICATION_COUNTS
				? { verifiedAt: new Date() }
				: {}),
		},
	});
};

/**
 * This function marks the current question as answered
 *
 * @param this - type declaration
 */
export const markAsAnswered = async function (this: QuestionsInterface) {
	await this.update({
		$set: { answeredAt: new Date() },
	});
};

/**
 * This function marks the current question as unanswered

 * @param this - type declaration
 */
export const markAsUnAnswered = async function (this: QuestionsInterface) {
	await this.update({
		$unset: { answeredAt: "" },
	});
};
