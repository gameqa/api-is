import { Response } from "express";
import { PrizeCategories, Prizes } from "../../../../../models";
import { ReadAllRequest } from "./interface";

/**
 * Route to read list of prize categories with prizes
 *
 * Used in: App, Dashboard
 */
export default async (req: ReadAllRequest, res: Response) => {
	const { user } = req.body;

	const prizesCategories = (
		await PrizeCategories.find().populate("prizes")
	).map((prizeCategory) => {
		return {
			_id: prizeCategory.id,
			name: prizeCategory.name,
			unlockedImg: prizeCategory.unlockedImg,
			lockedImg: prizeCategory.lockedImg,
			prereqDescription: `[[translation:be737f7e-1b79-4893-805c-8739912cb70d]] ${prizeCategory.requiredLVL}`,
			isAvailable: prizeCategory.requiredLVL <= user.level,
			prizes: prizeCategory.prizes.map((prize) => ({
				_id: prize.id,
				name: prize.name,
				img: prize.img,
				brandImg: prize.brandImg,
				available: prize.available,
			})),
			requiredLVL: prizeCategory.requiredLVL,
		};
	});

	res.send(prizesCategories);
};
