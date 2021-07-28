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

export const ALLOWED_QUERY_KEYS = [
	"archived",
	"isImpossible",
	"isDisqualified",
];
export const CHACHE_KEY = "questions:per:day";
export const CACHE_DURATION_SECONDS = 240;

export const getQueryObject = (
	requestQuery: Decleration.StringToString
): Decleration.QueryObject => {
	// object returned as output
	const queryObject: Decleration.QueryObject = {};

	// pass valid boolean constraints in to query object if provided in req.query
	// this is done as express has poor support for boolean query values
	for (const key in requestQuery) {
		if (!ALLOWED_QUERY_KEYS.includes(key))
			throw new Error(`${key} is not a valid query key`);
		queryObject[key] = requestQuery[key] === "false" ? false : true;
	}

	return queryObject;
};
