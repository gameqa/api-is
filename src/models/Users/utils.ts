import { UserTypes } from "./interface";

// constants
export const USER_TYPES: UserTypes[] = ["admin", "user", "not-verified"];
export const DEFAULT_USER_TYPE: UserTypes = "not-verified";
export const MIN_USER_NAME_LENGTH = 4;
export const MIN_PW_LENGTH = 5;
export const VERIFICATION_CODE_LENGTH = 6;
export const RESET_PASSWORD_CODE_LENGTH = 8;
export const RESET_PASSWORD_MAX_GUESS_COUNT = 3;
export const RESET_PASSWORD_TOKEN_RANDOM_NUM_LENGTH = 30;
//                                                ms  * s  * m  * h
export const RESET_PASSWORD_CODE_TIME_PERIOD_LENGTH = 1000 * 60 * 60 * 2;
export const RESET_PASSWORD_TOKEN_TIME_PERIOD_LENGTH = 1000 * 60 * 5;

export const generateVerificationCode = (length: number): string => {
	let output = "";
	for (let i = 0; i < length; i++) {
		// generates digit in range 0-9
		const digit = Math.floor(Math.random() * 10);
		output += digit.toString();
	}
	return output;
};
