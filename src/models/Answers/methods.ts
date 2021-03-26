import { Types } from "mongoose";
import { AnswersInterface } from "./interface";
import { Users } from "..";
import { VERIFICATION_COUNTS } from "./utils";

export const verify = async function (
	this: AnswersInterface,
	userId: Types.ObjectId,
	canBeShortened?: boolean
) {
	const user = await Users.findById(userId);
	if (!user) throw new Error("Verification must come from a userId");

	await this.update({
		$push: { verificationRoundIds: userId },
		$set: {
			canBeShortened:
				(canBeShortened ?? false) || this.canBeShortened,
			// spread out object with  verifiedAt if we want to verify
			...(this.verificationRoundIds.length + 1 ===
			VERIFICATION_COUNTS
				? { verifiedAt: new Date() }
				: {}),
		},
	});
};

export const markAsYesOrNo = async function (this: AnswersInterface) {
	this.isYesOrNo = true;
	await this.save();
};
