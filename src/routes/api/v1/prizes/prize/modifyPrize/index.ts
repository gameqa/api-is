import { Request, Response } from "express";
import { Prizes } from "../../../../../../models";
import { ModifyPrizeRequest } from "./interface";

export default async (req: ModifyPrizeRequest, res: Response) => {
	try {
		const { prizeId } = req.params;
		const { name, brandImg, img, available } = req.body;

		const newPrize = await Prizes.findByIdAndUpdate(
			prizeId,
			{
				name,
				brandImg,
				img,
				available,
			},
			{ new: true, useFindAndModify: false }
		);
		res.status(200).send(newPrize);
	} catch (error) {
		res.status(500).send({
			message: "Error while creating prize ",
		});
	}
};
