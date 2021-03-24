import { Request } from "express";
import { GameRoundsInterface, UserInterface } from "../../../../../models";

export interface AdvanceCurrentGameRoundRequest extends Request {
	body: {
		user: UserInterface;
		round: GameRoundsInterface;
	};
	params: {
		roundId: string;
	};
}
