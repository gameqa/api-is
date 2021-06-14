import { Response } from "express";
import { AskAboutImage } from "../../../../../models";
import { GetAskAboutImageRequest } from "./interface";

/**
 * GET a single image object for write question round
 */
export default async (_: GetAskAboutImageRequest, res: Response) => {
	try {
		res.status(200).send(AskAboutImage.getImage());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
