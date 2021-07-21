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
		shadowBanned: {
			type: Boolean,
		},
		lastDateActive: {
			type: String,
		},
		dailyStreak: {
			type: Number,
		},
		resetCount: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods = methods;
userSchema.statics = statics;

/**
 * Form validation, errors thrown here will send a message to the front end
 * */
userSchema.pre<UserInterface>("validate", async function (next) {
	/**
	 * TRIGGER:
	 *    this is always run
	 * DESCRIPTION:
	 *    check that there is a password
	 * RESULT:
	 *    on no password, throw error
	 */
	if (!this.password) {
		throw new Error("Það vantar lykilorð");
	}

	/**
	 * TRIGGER:
	 *    this is always run
	 * DESCRIPTION:
	 *    check if there is a username
	 * RESULT:
	 *    on no username, throw error
	 */
	if (!this.username) {
		throw new Error("Það vantar notandanafn");
	}

	/**
	 * TRIGGER:
	 *    this is always run
	 * DESCRIPTION:
	 *    check if there is a email
	 * RESULT:
	 *    on no email, throw error
	 */
	if (!this.email) {
		throw new Error("Það vantar tölvupóstfang");
	}

	next();
});

/**@mixin */
userSchema.statics = statics;
userSchema.methods = methods;

/**
 * PRE SAVE HOOK for User model
 */
userSchema.pre<UserInterface>("save", async function (next) {
	/**
	 * TRIGGER:
	 *    New instance of user created or
	 *    password has been changed by User
	 * DESCRIPTION:
	 *    When user changes password it is in plain text, so if password is valid we hash the password
	 *    else throw error
	 * RESULT:
	 *    new password hashed
	 */
	if (this.isModified("password")) {
		if (this.password.length < MIN_PW_LENGTH)
			throw new Error(`Lykilorð verður að vera amk. ${MIN_PW_LENGTH} stafir`);
		this.password = await this.hashString(this.password);
	}

	/**
	 * TRIGGER:
	 *    new instance of user created or username has been changed by user
	 * DESCRIPTION:
	 *    Removes whitespaces from beginning or end of string
	 * RESULT:
	 *     a clean string with the users username
	 */
	if (this.isModified("username")) {
		this.username = this.username.toLowerCase().trim();
	}

	/**
	 * TRIGGER:
	 *    new instance of user created or email has been changed by user
	 * DESCRIPTION:
	 *    Removes whitespaces from beginning or end of string
	 * RESULT:
	 *     a clean string with the users email
	 */
	if (this.isModified("email")) {
		this.email = this.email.toLowerCase().trim();
	}

	/**
	 * TRIGGER:
	 *    new verification code has been generated
	 * DESCRIPTION:
	 *    the new verification code is unhashed,
	 * 	  Sends the verification email with
	 *    the verification code everytime it is updated
	 * RESULT:
	 *    email has been sent.
	 *    new verification code hashed and saved
	 */
	if (this.isModified("verificationCode")) {
		const unHashed = this.verificationCode;
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

	/**
	 * TRIGGER:
	 *    User resets password and reset password code has been set
	 * DESCRIPTION:
	 *    the new reset-password verification code is unhashed,
	 * 	  Sends the reset-passwrod verification email with
	 *    the reset-passwrod verification code everytime it is updated
	 * RESULT:
	 *    email has been sent.
	 *    new reset-passwrod verification code hashed and saved
	 */
	if (
		this.isModified("resetPasswordCode") &&
		this.resetPasswordCode !== undefined
	) {
		const unHashed = this.resetPasswordCode.code;

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

	/**
	 * TRIGGER:
	 *     User is being saved for the first time.( on creation)
	 * DESCRIPTION:
	 *     Setting required default values
	 * RESULT:
	 *     New user is created with default values
	 */
	if (this.isNew) {
		this.type = DEFAULT_USER_TYPE;
		this.hasCompletedTutorial = false;
		let doc: UserInterface;
		// check if email is already taken
		doc = await Users.findOne({ email: this.email });
		if (doc) throw new Error("Tölvupóstfang er ekki laust");
		// check if username is already taken
		doc = await Users.findOne({ username: this.username });
		if (doc) throw new Error("Notendanafn er ekki laust");
		this.verificationCode = undefined;
		// new user placed last on highscore list
		this.hiscoreRank = await this.collection.estimatedDocumentCount();
		this.level = 1;
		this.invites = 0;
		this.resetPasswordCodeGuessCount = 0;
		this.pushNotificationTokens = [];
		this.shadowBanned = false;
		this.dailyStreak = 1;
		this.questionCount = 0;
		this.answerCount = 0;
		this.verifyAnswerCount = 0;
		this.verifyQuestionCount = 0;
		this.articlesFoundCount = 0;
	}

	/**
	 * TRIGGER:
	 *    this is always run
	 * DESCRIPTION:
	 *    validate the value of the usertype value
	 * RESULT:
	 *    on incorrect values throw error
	 */
	if (!USER_TYPES.includes(this.type as UserTypes))
		throw new Error("Invalid user type");
	/**
	 * TRIGGER:
	 *    this is always run
	 * DESCRIPTION:
	 *    validate the format of the email
	 * RESULT:
	 *    on incorrect format throw error
	 */
	if (!validator.isEmail(this.email))
		throw new Error("Tölvupóstfang er á röngu sniði");
	/**
	 * TRIGGER:
	 *    this is always run
	 * DESCRIPTION:
	 *    validate the length of the username
	 * RESULT:
	 *    on incorrect length throw error
	 */
	if (this.username.length < MIN_USER_NAME_LENGTH)
		throw new Error("Notendanafn verður að vera amk. 4 stafir");
	next();
});

/**
 * The user model represents any kind of user with-in
 * the system. This includes both users and system admins.
 * This means that admins can be players as well.
 *
 * The model contains information regarding authentication,
 * as well as statistics on the users playtime, including
 * the number of rounds completed by task type
 *
 * @param {string} username - the users chosen username, must be unique
 * @param {string} email - the users email. Must be both valid and unique
 * @param {string} password the users password. This value must be passed in as unhashed. Hashing
 *     will happen in a pre-save hook.
 * @param {Types.ObjectId} invitedBy - deprecated: the user who invited this user
 * @param {Types.ObjectId[]} invites - deprecated: the users that have been invited by this user
 * @param {boolean | undefined} hasCompletedTutorial - deprecated: no tutorial present in front end, redundant attribute
 * @param {UserTypes} type - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. The type of the user, f.x. 'admin', 'not-verified', 'user'
 *     the user type will be set to 'not-verified' by default when created, and will be set to user
 *     when the user verifies via auth code
 * @param {number} questionCount - SET BY DEFAULT BY MODEL. This parameter can not and should not
 *     be passed in to the constructor. Total number of questions created by the user (set to 0)
 * @param {number} answerCount - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. Total number of answer spans marked by user
 * @param {number} verifyAnswerCount - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. Total number of answer spans verified by the user
 * @param {number} verifyQuestionCount - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. Total number of questions verified by the user
 * @param {number} articlesFoundCount - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. Total number of articles found by user
 * @param {string} verificationCode - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. This is a code that is generated randomly, sent to the user
 *     via email which he must enter in order to be able to play the game. This code is stored in a
 *     hashed state.
 * @param {number} hiscoreRank - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. Hiscore rank is the users current rank on the hiscore. This number
 *     is updated periodically by a chron task but on the creation of a user we estimate that a users
 *     is last on the hiscore.
 * @param {number} level - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. The level is set to default as level 1. When the user completes
 *     a game round, each time, the level is incremented by +1
 * @param {boolean} allowEmail - true if the user allows a promotional email to be sent his or hers way
 * @param {string[]} pushNotificationTokens - an array of push notification tokens for mobile app users
 * @param {boolean} shadowBanned - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. If a user is shadow banned then his contributions to the data gathering
 *     process will be ignored, but he can still continue on playing and level up, none the wiser.
 * @param {string} lastDateActive - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. This is a string in the form of 'yyyy-MM-dd' which is used to keep
 *     track of login streaks.
 * @param {dailyStreak} number  - SET BY DEFAULT BY MODEL. This parameter can not and should not be
 *     passed in to the constructor. This is the number of days this user has been logged in
 *
 * TODO: document resetPasswordCode attribute
 * TODO: document resetPasswordToken attribute
 * TODO: document resetPasswordCodeGuessCount attribute
 * TODO: document resetCount attribute
 */
export const Users = model<UserInterface, UserCollectionInterface>(
	"users",
	userSchema,
	"users"
);

export * from "./interface";
