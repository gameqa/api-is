import { MapUserToMotivation } from "../decleration";
import * as utils from "../utils";

/**
 * array of functions that map
 * a user to a a social motivation
 *
 * user is not needed in this sub module
 * but is needed in other mappings
 *
 * The user of this module expec ts that MaoToMotivation type
 * functions accept a user parameter
 */
const mappings: MapUserToMotivation[] = [
	() => ({
		type: "social-impact",
		imageURL: "https://i.imgur.com/NfvVecw.jpg",
		description:
			"Með þínu framlagi styður þú við framþróun íslensku í upplýsingatækniþjóðfélaginu",
	}),

	/**
	 * TODO [ ] map to physical impairments
	 *      [ ] map to visual impairments
	 */
];

export const getItem = () => utils.getRandom(mappings);

export const isAvailable = () => true;
