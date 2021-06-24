import { Schema, model, Types } from "mongoose";
import { UserInterface, UserCollectionInterface, UserTypes } from "./interface";
import validator from "validator";
import * as methods from "./methods";
import * as statics from "./statics";
import {
	DEFAULT_USER_TYPE,
	USER_TYPES,
	MIN_USER_NAME_LENGTH,
	MIN_PW_LENGTH,
} from "./utils";
import { DynamicEmail } from "../../services";

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
		invitedBy: {
			type: Types.ObjectId,
			required: false,
		},
		invites: {
			type: Number,
			required: false,
		},
		type: {
			type: String,
			default: DEFAULT_USER_TYPE,
		},
		questionCount: {
			type: Number,
		},
		answerCount: {
			type: Number,
		},
		verifyAnswerCount: {
			type: Number,
		},
		verifyQuestionCount: {
			type: Number,
		},
		articlesFoundCount: {
			type: Number,
		},
		verificationCode: {
			type: String,
		},
		hiscoreRank: {
			type: Number,
		},
		level: {
			type: Number,
		},
		hasCompletedTutorial: {
			type: Boolean,
		},
		allowEmail: {
			type: Boolean,
			default: false,
		},
		pushNotificationTokens: {
			type: [String],
			default: [],
		},
		resetPasswordCode: {
			code: {
				type: String,
			},
			requestedAt: {
				type: Date,
			},
		},
		resetPasswordToken: {
			token: {
				type: String,
			},
			requestedAt: {
				type: Date,
			},
		},
		resetPasswordCodeGuessCount: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods = methods;
userSchema.statics = statics;

userSchema.pre<UserInterface>("validate", async function (next) {
	if (!this.password) {
		throw new Error("Það vantar lykilorð");
	}
	if (!this.username) {
		throw new Error("Það vantar notandanafn");
	}
	if (!this.email) {
		throw new Error("Það vantar tölvupóstfang");
	}
	next();
});

userSchema.pre<UserInterface>("save", async function (next) {
	if (this.isModified("password")) {
		if (this.password.length < MIN_PW_LENGTH)
			throw new Error(`Lykilorð verður að vera amk. ${MIN_PW_LENGTH} stafir`);
		this.password = await this.hashString(this.password);
	}
	if (this.isModified("username")) {
		this.username = this.username.toLowerCase().trim();
	}
	if (this.isModified("email")) {
		this.email = this.email.toLowerCase().trim();
	}
	if (this.isModified("verificationCode")) {
		const unHashed = this.verificationCode;
		/**
		 * Sends the verification email with
		 * the verification code everytime it is updated
		 */
		await new DynamicEmail.Sender({
			to: [this.email],
			from: DynamicEmail.DEFAULT_SENDER,
			subject: "Staðfestingarkóði Spurningar.is",
		}).send({
			templateId: DynamicEmail.REGISTER_USER_TEMPLATE,
			data: { verificationCode: unHashed! },
		});
		// update the verification code with its hash
		const shaHash = this.sha256(this.verificationCode);
		this.verificationCode = shaHash;
	}
	if (
		this.isModified("resetPasswordCode") &&
		this.resetPasswordCode !== undefined
	) {
		const unHashed = this.resetPasswordCode.code;
		/**
		 * Sends email with
		 * the reset pw code when it is updated
		 */
		await new DynamicEmail.Sender({
			to: [this.email],
			from: DynamicEmail.DEFAULT_SENDER,
			subject: "Breyta lykilorði Spurningar.is",
		}).send({
			templateId: DynamicEmail.RESET_PW_CODE_TEMPLATE,
			data: { resetPasswordCode: unHashed! },
		});
		// update the code with its hash
		this.resetPasswordCode.code = this.sha256(unHashed);
	}
	if (this.isNew) {
		this.type = "user" //DEFAULT_USER_TYPE;
		this.hasCompletedTutorial = false;
		let doc: UserInterface;
		doc = await Users.findOne({ email: this.email });
		if (doc) throw new Error("Tölvupóstfang er ekki laust");
		doc = await Users.findOne({ username: this.username });
		if (doc) throw new Error("Notendanafn er ekki laust");
		this.verificationCode = undefined;
		this.hiscoreRank = await this.collection.estimatedDocumentCount();
		this.level = 1;
		this.invites = 0;
		this.resetPasswordCodeGuessCount = 0;
		this.pushNotificationTokens = [];
	}
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
