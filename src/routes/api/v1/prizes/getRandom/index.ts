import { Request, Response } from "express";
import { getRandomPrize } from "./utils";

export default async (req: Request, res: Response) => {
	const prize = await getRandomPrize();
	res.send(prize);
};
