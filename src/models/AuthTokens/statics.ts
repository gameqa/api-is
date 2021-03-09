import { Types } from "mongoose";
import { AuthTokenCollectionInterface, DecodedToken } from "./interface";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../utils";
import { Users } from "../";

export const generate = async function (
	this: AuthTokenCollectionInterface,
	userId: Types.ObjectId
) {
	if (!Types.ObjectId.isValid(userId))
		throw new Error("Can not generate AuthToken from invalid UserId");

	const tokenString = jwt.sign({ _id: userId.toString() }, JWT_KEY);
	await this.create({ userId, tokenString });
	return tokenString;
};

export const getUserByTokenString = async function (
	this: AuthTokenCollectionInterface,
	tokenString: string
) {
	const decoded = jwt.verify(tokenString, JWT_KEY);
	if (typeof decoded === "string") throw Error("Invalid token");
	const doc = await this.findOne({
		tokenString,
		userId: (decoded as DecodedToken)._id,
	});
	if (doc === null) throw new Error("Token not found");
	const user = await Users.findById(doc.userId);
	if (user === null) throw new Error("User not found from tokenString");
	return user;
};

export const getExpiry = function (this: AuthTokenCollectionInterface) {
	const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 14;
	return new Date(Date.now() + TOKEN_TTL_MS);
};
