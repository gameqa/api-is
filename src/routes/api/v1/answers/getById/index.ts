import { Response } from "express";
import { Articles, GameRounds } from "../../../../../models";
import { GetByIdRequest } from "./interface";

/**
 * GET answer by id
 */
export default async (req: GetByIdRequest, res: Response) => {
	try {
		res.send(await req.body.answer.toPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
