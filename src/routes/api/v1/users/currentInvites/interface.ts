import { UserInterface } from "../../../../../models";

export interface CurrentInvitesRequest extends Express.Request {
	body: {
		user: UserInterface;
	};
}
