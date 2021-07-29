import { Users } from "../../../../models";
import * as Decleration from "./declerations";

/**
 * Queries users in MongoDB according to a given
 * query object. Then it aggregates them by
 * day
 *
 * @param queryObject query the users before aggregation by
 *    info in this object
 */
export const getUsersPerDay = async (queryObject: Decleration.QueryObject) => {
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
	return results
		.map((item) => ({
			count: item.count,
			date: new Date(Date.parse(item._id.date)),
		}))
		.sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const ALLOWED_QUERY_KEYS = ["hiscoreRank", "level", "shadowBanned"];

// memory cache key
export const CHACHE_KEY = "users:per:day";

// store the results in cache for this many secnods
export const CACHE_DURATION_SECONDS = 240;

/**
 * Maps an object (from express request query)
 * which can have boolean values as strings to objects
 * with actual boolean values
 *
 * For exmaple {archived: 'true'}
 *
 * This function does two things
 * i) validates that the query parameters
 *    are allowed
 * i) changes values from string to boolean
 *    if the user is shadowbanned,
 *    that is 'true' to true and 'false' to false
 *
 * @param requestQuery the .query object on Express.Request
 * @returns {Decleration.QueryObject} an object which maps allowed
 *    attributes to primitive boolean values
 */
export const getQueryObject = (
	requestQuery: Decleration.StringToString
): Decleration.QueryObject => {
	// object returned as output
	const queryObject: Decleration.QueryObject = {};

	for (const key in requestQuery) {
		if (!ALLOWED_QUERY_KEYS.includes(key))
			throw new Error(`${key} is not a valid query key`);
		if (queryObject.shadowBanned) {
			// pass valid boolean constraints in to query object if provided in req.query
			// this is done as express has poor support for boolean query values
			queryObject.shadowBanned = requestQuery[key] === "false" ? false : true;
		}
	}

	return queryObject;
};
