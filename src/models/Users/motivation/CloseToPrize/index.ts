import { UserInterface } from "../../interface";
import { MapUserToMotivation } from "../decleration";
import * as utils from "../utils";

const MAX_LEVEL = 10;
const LEVEL_FOR_PRIZE_ID_3 = 10;
const LEVEL_FOR_PRIZE_ID_2 = 5;
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
	(user) =>
		user.level >= LEVEL_FOR_PRIZE_ID_3
			? {
					type: "close-to-prize",
					text: "Vissir þú að þú hefur aflæst þennan vinninga flokk?",
					prizeId: "3",
			  }
			: user.level >= LEVEL_FOR_PRIZE_ID_2
			? {
					type: "close-to-prize",
					text: "Vissir þú að þú hefur aflæst þennan vinninga flokk?",
					prizeId: "2",
			  }
			: {
					type: "close-to-prize",
					text: "Vissir þú að þú hefur aflæst þennan vinninga flokk?",
					prizeId: "1",
			  },
	(user) =>
		user.level < LEVEL_FOR_PRIZE_ID_2
			? {
					type: "close-to-prize",
					text: `Þú ert ${
						LEVEL_FOR_PRIZE_ID_2 - user.level
					} lvl-um frá því að aflæsa þennan vinninga flokk`,
					prizeId: "2",
			  }
			: user.level < LEVEL_FOR_PRIZE_ID_3
			? {
					type: "close-to-prize",
					text: `Þú ert ${
						LEVEL_FOR_PRIZE_ID_3 - user.level
					} lvl-um frá því að aflæsa þennan vinninga flokk`,
					prizeId: "3",
			  }
			: user.invites < INVITES_FOR_PRIZE
			? {
					type: "close-to-prize",
					text: `Þú þarft að bjóða ${
						INVITES_FOR_PRIZE - user.invites
					} í viðbót til þess að aflæsa þennan vinninga flokk`,
					prizeId: "4",
			  }
			: {
					type: "close-to-prize",
					text: "Þú hefur aflæst alla mögulega vinningaflokka!",
					prizeId: "4",
			  },
];

export const getItem = () => utils.getRandom(mappings);
export const isAvailable = (user: UserInterface) =>
	user.level < MAX_LEVEL || user.invites < INVITES_FOR_PRIZE;
