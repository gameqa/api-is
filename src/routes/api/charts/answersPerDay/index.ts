import { Answers } from "../../../../models";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	try {
		const results = await Answers.aggregate([
			{ $match: { answeredAt: { $exists: true } } },
			{
				$project: {
					date: {
						$dateToString: {
							format: "%Y-%m-%d",
							date: "$answeredAt",
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
			message: "Unable to get chart at this time",
		});
	}
};
