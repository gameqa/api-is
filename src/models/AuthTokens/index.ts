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

/**
 * This is a model that store the tokenString for a session of a single user
 * A user can have many auth tokens (one per session per device)
 *
 * @param {string} tokenString string sent to front end for use to store the session
 * @param {string} userId the id of the user the session belongs to
 */
export const AuthTokens = model<
	AuthTokenInterface,
	AuthTokenCollectionInterface
>("authtokens", authTokenSchema, "authtokens");

export * from "./interface";
