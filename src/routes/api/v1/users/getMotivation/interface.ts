import { UserInterface } from "../../../../../models";

export interface GetMotivationRequest extends Express.Request {
	body: {
		user: UserInterface;
	};
}
