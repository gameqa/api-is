import { UserInterface } from "../../../../../models";

export interface VerificationCodeRequest extends Express.Request {
	body: {
		user: UserInterface;
	};
}
