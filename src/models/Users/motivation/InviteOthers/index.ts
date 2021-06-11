import { UserInterface } from "../../interface";
import { MapUserToMotivation } from "../decleration";
import * as utils from "../utils";

const INVITES_FOR_PRIZE = 10;

/**
 * array of functions that map
 * a user to  a motivation regarding
 * invites
 *
 * user is needed in the function
 * to determine the text
 *
 * we say that these motivations
 * are not available if the user has
 * already invited INVITES_FOR_PRIZE
 * many people
 */
const mappings: MapUserToMotivation[] = [
	(user) => ({
		type: "invite-others",
		description: `Ef þú býður ${
			INVITES_FOR_PRIZE - user.invites
		} í viðbót þá aflæsir þú nýjan vinningaflokk.`,
	}),
];

export const getItem = () => utils.getRandom(mappings);
export const isAvailable = (user: UserInterface) =>
	user.invites < INVITES_FOR_PRIZE;
