import { Response, Request } from "express";
import { Prizes } from "../../../../../../models";

export default async (req: Request, res: Response) => {
	try {
		const prizes = await Prizes.find();
		res.send(prizes);
	} catch (error) {
		res.status(500).send({ message: "unable to get prizes" });
	}
};
