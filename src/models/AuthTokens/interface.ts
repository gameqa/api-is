import { Document, Model, Types } from "mongoose";
import { UserInterface } from "../Users";

export interface AuthTokenInterface extends Document {
	tokenString: string;
	userId: Types.ObjectId;
}

export interface AuthTokenCollectionInterface
	extends Model<AuthTokenInterface> {
	generate: (_id: Types.ObjectId | string | number) => Promise<string>;
	getUserByTokenString: (tokenString: string) => Promise<UserInterface>;
	getExpiry: () => Date;
}

export interface DecodedToken {
	_id: string;
}
