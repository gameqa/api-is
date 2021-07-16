import { Request, Response } from "express";
import { PrizeCategories } from "../../../../../models";
import prizes from "../prizes.json";
import { ReadAllRequest } from "./interface";
import { prizeAvailable } from "./utils";

export default async (req: ReadAllRequest, res: Response) => {
	const { user } = req.body;

	const prizeCategories = (await PrizeCategories.find()).map(
		(prizeCategory) => ({
			_id: prizeCategory.id,
			name: prizeCategory.name,
			prereqDescription: `komast í lvl ${prizeCategory.requiredLvl}`,
			lockedImg: prizeCategory.lockedImg,
			unlockedImg: prizeCategory.unlockedImg,
			isAvailable: user.level >= prizeCategory.requiredLvl,
			prizes: [],
		})
	);

	res.send(prizeCategories);
};
