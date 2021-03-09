import { UserInterface } from "./interface";
import bcrypt from "bcrypt";

export const hashString = async function (this: UserInterface, text: string) {
	return await bcrypt.hash(text, 8);
};

export const getPublic = function (this: UserInterface) {
	return {
		username: this.username,
		email: this.email,
		type: this.type,
		_id: this._id,
	};
};
