import { Request } from "express";
import { UserInterface } from "../../../../../models";

export interface AdvanceCurrentGameRoundRequest extends Request {
	body: {
		user: UserInterface;
	};
	params: {
		roundId: string;
	};
}
