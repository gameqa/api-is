import { Request, Response } from "express";
import { ReadAllRequest } from "./interface";
/**
 * Prize give aways REST API resource end-point
 * @verb GET
 * @endpoint /api/v1/prize_give_aways
 * @version v1
 * @description the route will reutrn a array of object containing date and items of
 * 			past and future prize give aways
 * @auth user+
 * @example
 *     GET /api/v1/prize_give_aways \
 *     --data { }
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
