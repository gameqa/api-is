import { Types } from "mongoose";
import { AnswersInterface } from "./interface";
import { Users } from "..";
import { VERIFICATION_COUNTS } from "./utils";

export const verify = async function (
	this: AnswersInterface,
	userId: Types.ObjectId
) {
	const user = await Users.findById(userId);
	if (!user) throw new Error("Verification must come from a userId");

	await this.update({
		$push: { verificationRoundIds: userId },
		$set: {
			...(this.verificationRoundIds.length + 1 ===
			VERIFICATION_COUNTS
				? { verifiedAt: new Date() }
				: {}),
		},
	});
};
