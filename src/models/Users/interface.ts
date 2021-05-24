import { Document, Model, Types } from "mongoose";

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
	setVerificationCode: () => Promise<string>;
	verify: (code: string) => Promise<void>;
	getPublic: () => PublicUser;
	hashString: (val: string) => Promise<string>;
	sha256: (val: string) => string;
	completeTutorial: () => Promise<void>;
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
}

export interface UserAuthData {
	user: PublicUser;
	token: string;
}

export type UserTypes = "user" | "admin" | "not-verified";
