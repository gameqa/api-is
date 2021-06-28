import { Questions } from "../../../../models";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	try {
		const allowedQueryKeys = ['archived', 'isImpossible', 'isDisqualified'];

		const queryObject: {[key: string]: boolean} = {};

		for (const key in req.query) {
			if (!allowedQueryKeys.includes(key))
				throw new Error(`${key} is not a valid query key`);
			queryObject[key] = req.query[key] === 'false' ? false : true
		}
	
		const results = await Questions.aggregate([
			{ $match: queryObject },
			{
				$addFields : {
					createdAt: { $toDate: "$_id" }
				}
			}, 
			{
				$project: {
					date: {
						$dateToString: {
							format: "%Y-%m-%d",
							date: "$createdAt",
						},
					},
				},
			},
			{
				$group: {
					_id: { date: "$date" },
					count: { $sum: 1 },
				},
			},
		]);
		res.send(
			results
				.map((item) => ({
					count: item.count,
					date: new Date(Date.parse(item._id.date)),
				}))
				.sort((a, b) => a.date.getTime() - b.date.getTime())
		);
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
};
