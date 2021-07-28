import { Questions } from "../../../../models";
import * as Decleration from "./declerations";

export const getQuestionsPerDay = async (
	queryObject: Decleration.QueryObject
) => {
	const results = await Questions.aggregate([
		{ $match: {} },
		{
			$addFields: {
				createdAt: { $toDate: "$_id" },
			},
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
	return results
		.map((item) => ({
			count: item.count,
			date: new Date(Date.parse(item._id.date)),
		}))
		.sort((a, b) => a.date.getTime() - b.date.getTime());
};
