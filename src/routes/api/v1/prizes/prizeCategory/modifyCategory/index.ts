import { Request, Response } from "express";
import { PrizeCategories } from "../../../../../../models";
import { ModifyPrizeCategoryRequest } from "./interface";

export default async (req: ModifyPrizeCategoryRequest, res: Response) => {
	try {
		const { categoryId } = req.params;
		const { name, lockedImg, unlockedImg, requiredLVL, prizes } = req.body;

		const updatedCategory = await PrizeCategories.findByIdAndUpdate(
			categoryId,
			// req.body,
			{ name, lockedImg, unlockedImg, requiredLVL, prizes },
			{ new: true, useFindAndModify: false }
		);
		res.status(200).send(updatedCategory);
	} catch (error) {
		res.status(500).send({
			message: "Error while updating prizeCategory ",
		});
	}
};
