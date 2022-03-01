import { Request, Response } from "express";
import { PrizeCategories } from "../../../../../../models";

export default async (req: Request, res: Response) => {
	try {
		const { categoryId } = req.params;
		const deletedCategory = await PrizeCategories.findByIdAndDelete(categoryId);
		res.status(200).send(deletedCategory);
	} catch (error) {
		res.status(500).send({
			message: "Error while deleting prize ",
		});
	}
};
