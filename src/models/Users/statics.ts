import { UserRegisterInfo, UserCollectionInterface } from "./interface";
import { AuthTokens } from "../AuthTokens";
import bcrypt from "bcrypt";
import * as utils from "./utils";
import { USER_PW_HASH_KEY } from "../../utils";

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
	const user = await this.findOne({ email });
	if (!user) throw new Error(`User not found with email: ${email}`);
	user.resetPasswordCode = {
		code: utils.generateVerificationCode(utils.RESET_PASSWORD_CODE_LENGTH),
		requestedAt: new Date(),
	};
	user.resetPasswordToken = undefined;
	user.resetPasswordCodeGuessCount = 0;
	await user.save();
};

export const findByEmailAndRequestResetPasswordToken = async function (
	this: UserCollectionInterface,
	email: string,
	code: string
) {
	// check if code is undefined
	if (code === undefined) throw new Error("No code received");

	// find user by email
	const user = await this.findOne({ email });

	// make sure user exists and has resetPasswordInfo
	if (!user || user.resetPasswordCode === undefined)
		throw new Error(`No user with email ${email} has requested code`);

	if (user.resetPasswordCodeGuessCount >= utils.RESET_PASSWORD_MAX_GUESS_COUNT)
		throw new Error("Too many attempts to guess reset password code");

	// check if code has expired
	if (
		new Date().getTime() - user.resetPasswordCode.requestedAt.getTime() >
		utils.RESET_PASSWORD_CODE_TIME_PERIOD_LENGTH
	)
		throw new Error("code is no longer valid");

	const hashedInput = user.sha256(code);

	// if it isnt the same as the hashed code
	// then we increment a counter
	if (user.resetPasswordCode.code !== hashedInput) {
		user.resetPasswordCodeGuessCount += 1;
		await user.save();
		throw new Error("Hashed codes do not match");
	}

	user.resetPasswordToken = {
		token: await user.hashString(
			(user.resetPasswordCode.code +
				new Date().toISOString() +
				utils.generateVerificationCode(
					utils.RESET_PASSWORD_TOKEN_TIME_PERIOD_LENGTH
				)) as string
		),
		requestedAt: new Date(),
	};
	user.resetPasswordCode = undefined;

	await user.save();

	return user.resetPasswordToken.token;
};

export const findByEmailAndResetPassword = async function (
	this: UserCollectionInterface,
	email: string,
	token: string,
	password: string
) {
	// check if code is undefined
	if (token === undefined) throw new Error("No code received");

	// find user by email
	const user = await this.findOne({ email });

	// make sure user exists and has resetPasswordInfo
	if (!user || user.resetPasswordToken === undefined)
		throw new Error(`No user with email ${email} has requested token`);

	// check if code has expired
	if (
		new Date().getTime() - user.resetPasswordToken.requestedAt.getTime() >
		utils.RESET_PASSWORD_TOKEN_TIME_PERIOD_LENGTH
	)
		throw new Error("Token is no longer valid");

	if (token !== user.resetPasswordToken.token) throw new Error("Token invalid");

	user.password = password;
	user.resetPasswordCode = undefined;
	user.resetPasswordToken = undefined;

	await user.save();

	return user;
};
