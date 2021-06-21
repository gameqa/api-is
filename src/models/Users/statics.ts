import { UserRegisterInfo, UserCollectionInterface } from "./interface";
import { AuthTokens } from "../AuthTokens";
import bcrypt from "bcrypt";
import * as utils from "./utils";

export const register = async function (
	this: UserCollectionInterface,
	info: UserRegisterInfo
) {
	if (info.password !== info.password2)
		throw new Error("Lykilorð verða að vera eins");
	const user = await this.create(info);
	await user.setVerificationCode();
	return user;
};

export const findByCreds = async function (
	this: UserCollectionInterface,
	email: string,
	password: string
) {
	const user = await this.findOne({ email: email.toLowerCase().trim() });
	if (!user) throw new Error("No user with this email and password");
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error("No user with this email and password");
	const token = await AuthTokens.generate(user._id);
	return {
		user: user.getPublic(),
		token: token,
	};
};

export const findByEmailAndRequestResetPasswordCode = async function (
	this: UserCollectionInterface,
	email: string
) {
	const doc = await this.findOne({ email });
	if (!doc) throw new Error(`User not found with email: ${email}`);
	doc.resetPasswordInfo = {
		code: utils.generateVerificationCode(utils.RESET_PASSWORD_CODE_LENGTH),
		guessCount: 0,
		requestedAt: new Date(),
	};
	await doc.save();
};
