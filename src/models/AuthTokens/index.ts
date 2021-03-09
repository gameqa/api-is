import { Schema, model } from "mongoose";
import { AuthTokenInterface, AuthTokenCollectionInterface } from "./interface";
import * as statics from "./statics";

const authTokenSchema = new Schema(
	{
		tokenString: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

authTokenSchema.statics = statics;

export const AuthTokens = model<
	AuthTokenInterface,
	AuthTokenCollectionInterface
>("authtokens", authTokenSchema, "authtokens");

export * from "./interface";
