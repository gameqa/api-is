import { Document, Model, Types } from "mongoose";
import { MotivationType } from "./motivation/decleration";

export interface PublicUser {
	email: string;
	username: string;
	type: string;
	_id: string;
	scoreCard: {
		questions: number;
		answers: number;
		answerVerifications: number;
		questionVerifications: number;
		articles: number;
		hiscoreRank: number;
	};
	level: number;
	hasCompletedTutorial: boolean;
	streak: number;
	resetCount: number;
}

export interface UserInterface extends Document {
	username: string;
	email: string;
	password: string;
	type: UserTypes;
	questionCount?: number;
	answerCount?: number;
	verifyAnswerCount?: number;
	verifyQuestionCount?: number;
	articlesFoundCount?: number;
	verificationCode?: string;
	hiscoreRank: number;
	level: number;
	hasCompletedTutorial: boolean;
	invitedBy?: Types.ObjectId;
	invites: number;
	allowEmail: boolean;
	pushNotificationTokens: string[];
	// info regarding reset password
	resetPasswordCode?: ResetPasswordCodeInfo;
	resetPasswordToken?: ResetPasswordTokenInfo;
	resetPasswordCodeGuessCount: number;
	shadowBanned?: boolean;
	lastDateActive?: string;
	dailyStreak: number;
	resetCount?: number;
	setVerificationCode: () => Promise<string>;
	resetLevel: () => Promise<UserInterface>;
	verify: (code: string) => Promise<void>;
	getPublic: () => PublicUser;
	hashString: (val: string) => Promise<string>;
	sha256: (val: string) => string;
	completeTutorial: () => Promise<void>;
	getMovitation: () => MotivationType;
	getHighscoreList: () => Promise<PublicUser[]>;
}

export interface ResetPasswordCodeInfo {
	code: string;
	requestedAt: Date;
}
export interface ResetPasswordTokenInfo {
	token: string;
	requestedAt: Date;
}

export interface UserRegisterInfo {
	email: string;
	username: string;
	password: string;
	password2?: string;
	invitedBy?: string;
}

export interface UserCollectionInterface extends Model<UserInterface> {
	register: (v1: UserRegisterInfo) => Promise<UserInterface>;
	findByCreds: (email: string, passw: string) => Promise<UserAuthData>;
	findByEmailAndRequestResetPasswordCode: (email: string) => Promise<void>;
	findByEmailAndRequestResetPasswordToken: (
		email: string,
		code: string
	) => Promise<String>;
	findByEmailAndResetPassword: (
		email: string,
		token: string,
		password: string
	) => Promise<UserInterface>;
}

export interface UserAuthData {
	user: PublicUser;
	token: string;
}

export type UserTypes = "user" | "admin" | "not-verified";
