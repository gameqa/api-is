import { UserInterface } from "../../interface";
import { MapUserToMotivation } from "../decleration";
import * as utils from "../utils";

const LEVEL_FOR_PRIZE_ID_5 = 20;
const LEVEL_FOR_PRIZE_ID_4 = 15;
const LEVEL_FOR_PRIZE_ID_3 = 10;
const LEVEL_FOR_PRIZE_ID_2 = 5;

const formatLvlToPrizeString = (lvl: number) => `[[translation:82749b03-becd-4845-bfa9-0ef8a1cb5ea2]]`;

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
	(user) =>
		user.level >= LEVEL_FOR_PRIZE_ID_3
			? {
					type: "close-to-prize",
					text: "[[translation:7aa3322d-a60e-4b38-91c8-ffbdc7aa06f5]]",
					prizeId: "3",
			  }
			: user.level >= LEVEL_FOR_PRIZE_ID_2
			? {
					type: "close-to-prize",
					text: "[[translation:7aa3322d-a60e-4b38-91c8-ffbdc7aa06f5]]",
					prizeId: "2",
			  }
			: {
					type: "close-to-prize",
					text: "[[translation:7aa3322d-a60e-4b38-91c8-ffbdc7aa06f5]]",
					prizeId: "1",
			  },
	(user) =>
		user.level < LEVEL_FOR_PRIZE_ID_2
			? {
					type: "close-to-prize",
					text: formatLvlToPrizeString(LEVEL_FOR_PRIZE_ID_2 - user.level),
					prizeId: "2",
			  }
			: user.level < LEVEL_FOR_PRIZE_ID_3
			? {
					type: "close-to-prize",
					text: formatLvlToPrizeString(LEVEL_FOR_PRIZE_ID_3 - user.level),
					prizeId: "3",
			  }
			: user.invites < LEVEL_FOR_PRIZE_ID_4
			? {
					type: "close-to-prize",
					text: formatLvlToPrizeString(LEVEL_FOR_PRIZE_ID_4 - user.level),
					prizeId: "4",
			  }
			: user.invites < LEVEL_FOR_PRIZE_ID_5
			? {
					type: "close-to-prize",
					text: formatLvlToPrizeString(LEVEL_FOR_PRIZE_ID_5 - user.level),
					prizeId: "5",
			  }
			: {
					type: "close-to-prize",
					text: "[[translation:aa635d9d-a3c2-4a47-a67a-31a45a5d1966]]",
					prizeId: "5",
			  },
];

export const getItem = () => utils.getRandom(mappings);
export const isAvailable = () => false;
