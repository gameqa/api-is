import { Response } from "express";
import { AskAboutImage } from "../../../../../models";
import { GetAskAboutImageRequest } from "./interface";

/**
 * @verb GET
 * @endpoint /api/v1/game_rounds/write_question/image
 * @version v1
 * @description the route responds with a single image object for write question round
 * @auth user+
 * @example
 *     GET /api/v1/game_rounds/write_question/image \
 *     --data { }
 */
export default async (_: GetAskAboutImageRequest, res: Response) => {
	try {
		res.status(200).send(AskAboutImage.getImage());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
