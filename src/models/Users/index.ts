import { Schema, model } from "mongoose";
import {
	UserInterface,
	UserCollectionInterface,
	UserTypes,
} from "./interface";
import validator from "validator";
import * as methods from "./methods";
import * as statics from "./statics";
import {
	DEFAULT_USER_TYPE,
	USER_TYPES,
	MIN_USER_NAME_LENGTH,
	MIN_PW_LENGTH,
} from "./utils";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: DEFAULT_USER_TYPE,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods = methods;
userSchema.statics = statics;

userSchema.pre<UserInterface>("save", async function (next) {
	if (this.isModified("password")) {
		if (this.password.length < MIN_PW_LENGTH)
			throw new Error("Lykilorð verður að vera amk. 8 stafir");
		this.password = await this.hashString(this.password);
	}
	if (this.isNew) this.type = DEFAULT_USER_TYPE;
	if (!USER_TYPES.includes(this.type as UserTypes))
		throw new Error("Invalid user type");
	if (!validator.isEmail(this.email))
		throw new Error("Tölvupóstfang er á röngu sniði");
	if (this.username.length < MIN_USER_NAME_LENGTH)
		throw new Error("Notendanafn verður að vera amk. 4 stafir");
	next();
});

export const Users = model<UserInterface, UserCollectionInterface>(
	"users",
	userSchema,
	"users"
);

export * from "./interface";
