import { Users } from "../../../../models";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	try {
		const allowedQueryKeys = ["hiscoreRank", "level", "shadowBanned"];

		const queryObject: { [key: string]: any } = { ...req.query };

		for (const key in queryObject)
			if (!allowedQueryKeys.includes(key))
				throw new Error(`${key} is not a valid query key`);

		if (queryObject.shadowBanned) {
			queryObject.shadowBanned =
				queryObject.shadowBanned === "false" ? false : true;
		}

		const results = await Users.aggregate([
			{ $match: queryObject },
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
