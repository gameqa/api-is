import { Schema, model } from "mongoose";
import { UserInterface, UserCollectionInterface, UserTypes } from "./interface";
import validator from "validator";
import * as methods from "./methods";
import * as statics from "./statics";
import { DEFAULT_USER_TYPE, USER_TYPES } from "./utils";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			minlength: 4,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			validate: {
				validator: (val: string) => validator.isEmail(val),
			},
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
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
	if (this.isModified("password"))
		this.password = await this.hashString(this.password);
	if (this.isNew) this.type = DEFAULT_USER_TYPE;
	if (!USER_TYPES.includes(this.type as UserTypes))
		throw new Error("Invalid user type");
	next();
});

userSchema.post<UserInterface>("init", async function (doc) {
	doc.type = DEFAULT_USER_TYPE;
});

export const Users = model<UserInterface, UserCollectionInterface>(
	"users",
	userSchema,
	"users"
);

export * from "./interface";
