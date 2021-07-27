import { Request, Response } from "express";
import { ReadAllRequest } from "./interface";
/**
 * Prize give aways REST API resource end-point
 * @endpoint /api/v1/prize_give_aways
 * @name prizeGiveAways
 * @version v1
 * @since v1
 * @description Sends Array of objects with date and items about all giveaways,
 * 			  past, present or future to the front end.
 */

export default async (req: ReadAllRequest, res: Response) => {
	res.send([
		{
			time: new Date(1625158800000), // 17:00 june 30th,
			items: [],
		},
		{
			time: new Date(1625763600000), // 17:00 july 7th,
			items: [],
		},
		{
			time: new Date(1626368400000), // 17:00 july 15th,
			items: [],
		},
		{
			time: new Date(1626973200000), // 17:00 july 22th,
			items: [],
		},
		{
			time: new Date(1627578000000), // 17:00 july 29th,
			items: [],
		},
		{
			time: new Date(1628182800000), // 17:00 august 5th,
			items: [],
		},
	]);
};
