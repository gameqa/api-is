import { Response } from "express";

export default async (req: Request, res: Response) => {
	try {
		res.status(200).send("");
	} catch (error) {
		res.status(400).send({ message: "Didn't send" });
	}
};
