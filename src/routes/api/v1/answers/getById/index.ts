import { Response } from "express";
import { GetByIdRequest } from "./interface";
import * as Services from "../../../../../services";
import * as Models from "../../../../../models";

/**
 * Answers REST API resource end-point
 * @endpoint /api/v1/:answerId
 * @name Answers get by id
 * @version v1
 * @since v1
 * @description Answers REST API resource end-point
 *     Answer from body, set time to live in cache to 1 day if quesiton is answered,
 *     else set time to live to 300 seconds.
 *     Get public answer form cache if cached, else set answer to cache.
 *     Send answer to front end.
 */
export default async (req: GetByIdRequest, res: Response) => {
	try {
		// destructure answer from body
		const { answer } = req.body;

		// declare const for cache duration
		const ANSWERED_QUESTION_TTL = 86400;
		const UNANSWERED_QUESTION_TTL = 300;

		// declare cache key and cache TTL duration
		const cacheKey = `answer:${answer._id}:public`;
		const cacheTime = !!answer.answeredAt
			? ANSWERED_QUESTION_TTL
			: UNANSWERED_QUESTION_TTL;

		// get from cache or set to cache if not found
		const publicAnswer = await Services.Cache.getOrSetTTL<Models.PublicAnswer>(
			cacheKey,
			cacheTime,
			async () => {
				const publicViewOfAnswer = await answer.toPublic();
				return publicViewOfAnswer;
			}
		);

		// send response
		res.set("Cache-Control", `public, max-age=${cacheTime}`).send(publicAnswer);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
