import { Document, Model } from "mongoose";

export interface PublicUser {
	email: string;
	username: string;
	type: string;
	_id: string;
}

export interface UserInterface extends Document {
	username: string;
	email: string;
	password: string;
	hashString: (val: string) => Promise<string>;
	type: string;
	getPublic: () => PublicUser;
}

export interface UserRegisterInfo {
	email: string;
	username: string;
	password: string;
}

export interface UserCollectionInterface extends Model<UserInterface> {
	register: (v1: UserRegisterInfo) => Promise<UserInterface>;
	findByCreds: (email: string, passw: string) => Promise<UserAuthData>;
}

export interface UserAuthData {
	user: PublicUser;
	token: string;
}

export type UserTypes = "user" | "admin";
