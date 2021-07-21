import { Types } from "mongoose";
import { AuthTokenCollectionInterface, DecodedToken } from "./interface";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../utils";
import { UserInterface, Users } from "../";

/**
 * Generate an auth token for a single user by his Id
 * @param this for type decleration only
 * @param userId the id of the user we want to generate a token for
 *
 * @returns {Promise<string>} the token string for the auth token
 */
export const generate = async function (
	this: AuthTokenCollectionInterface,
	userId: Types.ObjectId
): Promise<string> {
	// validate that the userId is a valid objectId
	if (!Types.ObjectId.isValid(userId))
		throw new Error("Can not generate AuthToken from invalid UserId");

	// generate a token String with jwt.sign
	const tokenString = jwt.sign({ _id: userId.toString() }, JWT_KEY);

	// create a token instance
	await this.create({ userId, tokenString });

	// return the tokenString
	return tokenString;
};

/**
 * This function accepts a token string
 * and returns the user which the token string
 * belongs to
 *
 * throws Error if nothing is found and/or
 * if the input data is invalid
 * @param this for type decleration only
 * @param tokenString the string representing the token
 *
 * @returns {Promise<UserInterface>}
 */
export const getUserByTokenString = async function (
	this: AuthTokenCollectionInterface,
	tokenString: string
): Promise<UserInterface> {
	// decode the JWT
	const decoded = jwt.verify(tokenString, JWT_KEY);

	// the decoded should not be a string, rather an object
	if (typeof decoded === "string") throw Error("Invalid token");

	// find a token with the tokenString and the decoded userId
	const doc = await this.findOne({
		tokenString,
		userId: (decoded as DecodedToken)._id,
	});

	// if no token instance is found, throw error
	if (doc === null) throw new Error("Token not found");

	// find user by id
	const user = await Users.findById(doc.userId);

	// if no user is found throw error
	if (user === null) throw new Error("User not found from tokenString");

	// finally, return the user
	return user;
};

/**
 * get an expiry date in the future for a auth token created now
 *
 * @param this for type declerations only
 *
 * @returns {Date} the date in the future on which the token should expire
 */
export const getExpiry = function (this: AuthTokenCollectionInterface) {
	//  TOKEN_TTL_MS currently = 1 YEAR
	const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7 * 52;

	// return the future expiry date
	return new Date(Date.now() + TOKEN_TTL_MS);
};
