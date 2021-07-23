import { Request, Response } from "express";
import prizes from "../prizes.json";
import { ReadAllRequest } from "./interface";
import { prizeAvailable } from "./utils";

export default async (req: ReadAllRequest, res: Response) => {
	const { user } = req.body;

	const prizeCategories = prizes.map((prize) => ({
		...prize,
		isAvailable: prizeAvailable(prize._id, user),
	}));

	res.send(prizeCategories);
};
